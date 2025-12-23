import pandas as pd

# =================================
def salvar_csv_autores(df):
    # limpar valores nan
    autores = df['AUTOR'].unique()
    cleaned_series = pd.Series(autores).dropna()
    autores_list = cleaned_series.tolist()
    autores_list    
    
    # salvar
    headers=['NOME']
    df = pd.DataFrame(autores_list, columns=headers)
    arquivo='csv/autores-01.csv'
    print(f'Salvando o arquivo {arquivo}')
    df.to_csv(arquivo)    
# =================================    
def salvar_csv_editoras(df):
    # limpar valores nan
    editoras = df['EDITORA'].unique()
    cleaned_series = pd.Series(editoras).dropna()
    editoras_list = cleaned_series.tolist()
    editoras_list    
    
    # salvar
    headers=['NOME']
    df = pd.DataFrame(autores_list, columns=headers)
    arquivo='csv/editoras-01.csv'
    print(f'Salvando o arquivo {arquivo}')
    df.to_csv(arquivo)        
# =================================    
def salvar_csv_idiomas(df):
    # limpar valores nan
    idiomas = df['IDIOMA'].unique()
    cleaned_series = pd.Series(idiomas).dropna()
    idiomas_list = cleaned_series.tolist()
    idiomas_list   
    
    # salvar
    headers=['NOME']
    df = pd.DataFrame(idiomas_list, columns=headers)
    arquivo='csv/idiomas-01.csv'
    print(f'Salvando o arquivo {arquivo}')
    df.to_csv(arquivo)   
# =================================    


df = pd.read_csv('biblioteca.csv')
salvar_csv_autores(df)
salvar_csv_editoras(df)
salvar_csv_idiomas(df)