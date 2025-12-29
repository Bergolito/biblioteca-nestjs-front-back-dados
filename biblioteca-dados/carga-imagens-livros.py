import psycopg2
from pathlib import Path
import re

# =================================
# CONFIGURAÇÃO DO BANCO DE DADOS
# =================================
DB_CONFIG = {
    'host': 'localhost',
    'database': 'biblioteca',
    'user': 'postgres',
    'password': 'postgres',  # Ajuste conforme necessário
    'port': 5432
}

# =================================
# DIRETÓRIO DAS IMAGENS
# =================================
IMAGES_DIR = Path('./biblioteca-imagens')

# =================================
def extrair_livro_id(nome_arquivo):
    """
    Extrai o ID do livro do nome do arquivo
    Exemplo: '001-churchill.jpg' -> 1
    """
    match = re.match(r'^(\d+)-', nome_arquivo)
    if match:
        return int(match.group(1))
    return None

def extrair_tipo_arquivo(nome_arquivo):
    """
    Extrai o tipo de arquivo (extensão) do nome do arquivo
    Exemplo: '001-churchill.jpg' -> 'jpg'
    """
    match = re.search(r'\.(\w+)$', nome_arquivo)
    if match:
        return match.group(1).lower()
    return None

def extrair_tamanho_arquivo(nome_arquivo):
    """
    Extrai o tamanho do arquivo em bytes
    """
    caminho_arquivo = IMAGES_DIR / nome_arquivo
    return caminho_arquivo.stat().st_size

def ajuste_nome_imagens():
    """
    Ajusta os nomes dos arquivos de imagem para garantir que estejam no formato correto
    Exemplo: 121_70_12.jpg -> 121-70_12.jpg
    """
    for img_path in IMAGES_DIR.iterdir():
        if img_path.is_file():
            nome_original = img_path.name
            # Substitui o primeiro underscore por hífen se existir
            if '_' in nome_original:
                # Extrai a extensão
                nome_sem_extensao, extensao = nome_original.rsplit('.', 1)
                # Substitui apenas o primeiro underscore por hífen
                nome_ajustado = nome_sem_extensao.replace('_', '-', 1)
                novo_nome = f"{nome_ajustado}.{extensao}"
                novo_caminho = IMAGES_DIR / novo_nome
                
                if nome_original != novo_nome:
                    img_path.rename(novo_caminho)
                    print(f"Renomeado: {nome_original} -> {novo_nome}")
# =================================
def carregar_imagem_como_bytes(caminho_arquivo):
    """
    Lê o arquivo de imagem e retorna seus bytes
    """
    with open(caminho_arquivo, 'rb') as f:
        return f.read()

# =================================
def carregar_imagens_livros():
    """
    Carrega todas as imagens da pasta e insere na tabela imagens_livro
    """
    try:
        # Conectar ao banco
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Verificar se a tabela existe
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'imagens_livro'
            );
        """)
        
        if not cursor.fetchone()[0]:
            print("Tabela 'imagens_livro' não existe!")
            return
        
        # Limpar tabela (opcional - remova se não quiser limpar)
        cursor.execute("DELETE FROM imagens_livro;")
        cursor.execute("UPDATE livros SET imagem_id = NULL;")
        print("Tabela limpa")
        
        # Listar todos os arquivos de imagem
        imagens = sorted(IMAGES_DIR.glob('*.jpg')) + sorted(IMAGES_DIR.glob('*.jpeg')) + sorted(IMAGES_DIR.glob('*.png'))
        
        total_sucesso = 0
        total_erro = 0
        
        for img_path in imagens:
            try:
                # Extrair ID do livro do nome do arquivo
                livro_id = extrair_livro_id(img_path.name)
                print(f"Processando {img_path.name} - Livro ID: {livro_id}")

                if livro_id is None:
                    print(f"Ignorando {img_path.name} - formato inválido")
                    total_erro += 1
                    continue
                
                # Verificar se o livro existe
                cursor.execute("SELECT id FROM livros WHERE id = %s", (livro_id,))
                if cursor.fetchone() is None:
                    print(f"Livro ID {livro_id} não existe - ignorando {img_path.name}")
                    total_erro += 1
                    continue
                
                # Carregar bytes da imagem
                imagem_bytes = carregar_imagem_como_bytes(img_path)
                
                # Preparar descrição
                descricao = f"Capa do livro - {img_path.name}"
                
                # Inserir na tabela imagens_livro
                cursor.execute("""
                    INSERT INTO imagens_livro (descricao, arquivo, mime_type, tamanho)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                """, (descricao, psycopg2.Binary(imagem_bytes), extrair_tipo_arquivo(img_path.name), extrair_tamanho_arquivo(img_path.name)))
                
                imagem_id = cursor.fetchone()[0]
                
                # Atualizar o livro com o imagem_id
                cursor.execute("""
                    UPDATE livros 
                    SET imagem_id = %s 
                    WHERE id = %s;
                """, (imagem_id, livro_id))
                
                tamanho_kb = len(imagem_bytes) / 1024
                print(f"✅ {img_path.name} -> Livro ID {livro_id} (Imagem ID {imagem_id}) - {tamanho_kb:.2f} KB")
                total_sucesso += 1
                
            except Exception as e:
                print(f"❌ Erro ao processar {img_path.name}: {e}")
                total_erro += 1
                conn.rollback()
                continue
        
        # Commit das alterações
        conn.commit()
        
        print(f"\n{'='*60}")
        print(f"✅ Total de sucesso: {total_sucesso}")
        print(f"❌ Total de erros: {total_erro}")
        print(f"{'='*60}")
        
        # Mostrar estatísticas
        cursor.execute("SELECT COUNT(*) FROM imagens_livro;")
        total_imagens = cursor.fetchone()[0]
        
        cursor.execute("""
            SELECT SUM(LENGTH(arquivo))::bigint 
            FROM imagens_livro;
        """)
        tamanho_total = cursor.fetchone()[0] or 0
        tamanho_total_mb = tamanho_total / (1024 * 1024)
        
        print(f"📊 Total de imagens no banco: {total_imagens}")
        print(f"💾 Espaço total ocupado: {tamanho_total_mb:.2f} MB")
        print(f"{'='*60}\n")
        
        # Fechar conexão
        cursor.close()
        conn.close()
        
        print("✅ Processo concluído!")
        
    except Exception as e:
        print(f"❌ Erro na conexão ou execução: {e}")

# =================================
# EXECUTAR
# =================================
if __name__ == "__main__":
    print("🚀 Iniciando carga de imagens dos livros...")
    print(f"📁 Diretório: {IMAGES_DIR.absolute()}")
    
    if not IMAGES_DIR.exists():
        print(f"❌ Diretório {IMAGES_DIR} não existe!")
    else:
        carregar_imagens_livros()
        #ajuste_nome_imagens()
