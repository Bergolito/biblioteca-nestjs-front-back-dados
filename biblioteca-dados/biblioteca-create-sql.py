import pandas as pd

# =================================
# ler o csv de autores na pasta csv e gerar um sql de insert 
def cria_sql_autores():
    df = pd.read_csv('csv/autores-01.csv')
    arquivo_sql = 'sql/inserts_autores.sql'
    # cria o arquivo sql/inserts_autores.sql   
        
    with open(arquivo_sql, 'w', encoding='utf-8') as f:
        for _, row in df.iterrows():
            id = row['ID']
            nome = row['NOME'].replace("'", "''")  # Escapar aspas simples
            sql = f"INSERT INTO autores (id, nome, nacionalidade) VALUES ({id}, '{nome}', NULL);\n"
            f.write(sql)
    f.close()            
    print(f'SQL de autores salvo em {arquivo_sql}')

# =================================
# ler o csv de editoras na pasta csv e gerar um sql de insert 
def cria_sql_editoras():
    df = pd.read_csv('csv/editoras-01.csv')
    arquivo_sql = 'sql/inserts_editoras.sql'
    
    with open(arquivo_sql, 'w', encoding='utf-8') as f:
        for _, row in df.iterrows():
            id = row['ID']
            nome = row['NOME'].replace("'", "''")  # Escapar aspas simples
            sql = f"INSERT INTO editoras (id, nome) VALUES ({id}, '{nome}');\n"
            f.write(sql)
    f.close()
    print(f'SQL de editoras salvo em {arquivo_sql}')

# =================================
# ler o csv de idiomas na pasta csv e gerar um sql de insert 
def cria_sql_idiomas():
    df = pd.read_csv('csv/idiomas-01.csv')
    arquivo_sql = 'sql/inserts_idiomas.sql'
    
    with open(arquivo_sql, 'w', encoding='utf-8') as f:
        for _, row in df.iterrows():
            id = row['ID']
            nome = row['NOME'].replace("'", "''")  # Escapar aspas simples
            sql = f"INSERT INTO idiomas (id, codigo, descricao) VALUES ({id}, '{nome}', '{nome}');\n"
            f.write(sql)
    f.close()
    print(f'SQL de idiomas salvo em {arquivo_sql}')

# =================================    
def cria_sql_livros():
    df = pd.read_csv('csv/livros-01.csv')
    arquivo_sql = 'sql/inserts_livros.sql'
    
    df_autores = pd.read_csv('csv/autores-01.csv')
    df_editoras = pd.read_csv('csv/editoras-01.csv')
    df_idiomas = pd.read_csv('csv/idiomas-01.csv')


    with open(arquivo_sql, 'w', encoding='utf-8') as f:
        for _, row in df.iterrows():

            try:
                id = row['ID']
                titulo = row['TITULO'].replace("'", "''")  # Escapar aspas simples
                subtitulo = row['SUBTITULO'].replace("'", "''") if not pd.isna(row['SUBTITULO']) else 'NULL'  # Escapar aspas simples
                
                # autor
                autor = row['AUTOR'].replace("'", "''") if not pd.isna(row['AUTOR']) else 'NULL'  # Escapar aspas simples
                linha_autor = df_autores[df_autores['NOME'] == autor].iloc[0]
                codigo_autor = linha_autor['ID'] if not linha_autor.empty else 'NULL'
                
                # editora
                editora = row['EDITORA'].replace("'", "''") if not pd.isna(row['EDITORA']) else 'NULL'  # Escapar aspas simples
                linha_editora = df_editoras[df_editoras['NOME'] == editora].iloc[0]
                codigo_editora = linha_editora['ID'] if not linha_editora.empty else 'NULL'
                
                # demais campos
                edicao = int(row['EDICAO']) if not pd.isna(row['EDICAO']) else 'NULL'
                ano = int(row['ANO']) if not pd.isna(row['ANO']) else 'NULL'
                n_paginas = int(row['N_PAGINAS']) if not pd.isna(row['N_PAGINAS']) else 'NULL'
                
                # idioma
                idioma = row['IDIOMA'].replace("'", "''") if not pd.isna(row['IDIOMA']) else 'NULL'  # Escapar aspas simples
                linha_idioma = df_idiomas[df_idiomas['NOME'] == idioma].iloc[0]
                codigo_idioma = linha_idioma['ID'] if not linha_idioma.empty else 'NULL'

                # sql de insert
                sql = f"INSERT INTO livros (id, titulo, subtitulo, edicao, num_paginas, ano, autor_id, editora_id, idioma_id, imagem_id) VALUES "
                sql += f"({id}, '{titulo}', '{subtitulo}', {edicao}, {n_paginas}, {ano}, {codigo_autor}, {codigo_editora}, {codigo_idioma}, NULL);\n"
                f.write(sql)

            except IndexError as index:
                print(f'Linha: {row}')
                print(index)

            except Exception as e:
                print(f'Erro ao processar linha: {row}')
                print(e)
    f.close()
    print(f'SQL de livros salvo em {arquivo_sql}')
# =================================    

# =================================    
# main
# =================================    
cria_sql_autores()
cria_sql_editoras()
cria_sql_idiomas()
cria_sql_livros()
