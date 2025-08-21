import tkinter as tk

# Lista de treinos com níveis crescentes de dificuldade
treinos = [
    "1º - 5º dia: 3 séries de 15 abdominais básicos",
    "6º - 10º dia: 3 séries de 20 abdominais básicos + 15 abdominais oblíquos",
    "11º - 15º dia: 4 séries de 20 abdominais básicos + 20 abdominais oblíquos + 15 prancha",
    "16º - 20º dia: 4 séries de 25 abdominais básicos + 25 abdominais oblíquos + 20 prancha + 10 elevação de pernas",
    "21º - 25º dia: 5 séries de 30 abdominais básicos + 30 abdominais oblíquos + 30 prancha + 20 elevação de pernas",
    "26º - 30º dia: 5 séries de 35 abdominais básicos + 35 abdominais oblíquos + 40 prancha + 30 elevação de pernas + 15 bicicleta"
]

def mostrar_treino(dia):
    idx = (dia - 1) // 5  # Define o nível de treino baseado no dia
    treino_label.config(text=f"Treino do dia {dia}:\n{treinos[idx]}")

# Criando interface gráfica
janela = tk.Tk()
janela.title("Calendário de Treino de Abdômen")

tk.Label(janela, text="Escolha o dia do treino:", font=("Arial", 12)).pack()
dia_entry = tk.Entry(janela)
dia_entry.pack()

treino_label = tk.Label(janela, text="", font=("Arial", 12), wraplength=400)
treino_label.pack()

tk.Button(janela, text="Mostrar Treino", command=lambda: mostrar_treino(int(dia_entry.get()))).pack()

janela.mainloop()