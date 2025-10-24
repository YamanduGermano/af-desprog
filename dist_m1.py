dists = [
    [-1 , 0.5, "Queda d'água"],
    [-2.5 , 1.5, "Riacho"],
    [1 , 1.5, "Pedra do sapo"],
    [2 , 1, "Córrego azul"],
    [-2 , -1, "Rio Branco"],
    [1.5 , -1.5, "Pedra molhada"],
    [2.5 , -0.5, "Lagoa doce"]
]

for d in dists:
    print(f'{str(d[2]).ljust(13)}: {((d[0]**2 + d[1]**2)**.5):.2f} km')