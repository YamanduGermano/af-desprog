<div style="
    background-image: url('imagens/voronoi-diagram.png');
    background-size: cover;
    filter: brightness(1.5);
    width:100%;">
    <p style="
    color:black;
    font-weight: bold;
    font-size: 32px;
    margin-block: auto;
    text-align: center;
    padding:2em;
    ">Algoritmo de Fortune para Diagrama de Voronoi</p></div>

Source: [virilo, Stack Overflow.](https://stackoverflow.com/questions/53696900/render-voronoi-diagram-to-numpy-array)

---

## Motivação

Imagine que você é um pássaro!
Você está voando o dia todo e não conseguiu beber nenhum gole de água. Por sorte, você sabe que ao seu redor, num raio de poucos quilômetros, existem algumas fontes de água. Aqui está o mapa da floresta:

![Mapa da floresta](imagens/mapa1.jpg)

Cada caixinha azul é um ponto de água diferente.

> Como sabemos qual ponto de água mais próximo de você?

## Solução simples
Você sabe sua posição e a posição das fontes de água ao seu redor pois você é um pássaro e seu senso de localização é ótimo! (quase um GPS biológico).

![Mapa da florestacom coordenadas](imagens/mapa2.jpg)

É possível calcular todas as distâncias entre os você e cada um dos pontos utilizando o teorema de pitágoras.

Tente encontrar o menor valor entre eles
<details>
<summary>
Resposta
</summary>
<table>
<tr>
<th>Lugar</th>
<th>Distância</th>
</tr>

<tr>
<td>Queda d'água</td>
<td>1.12 km</td>
</tr>

<tr>
<td>Riacho</td>
<td>2.92 km</td>
</tr>

<tr>
<td>Pedra do sapo</td>
<td>1.80 km</td>
</tr>

<tr>
<td>Córrego azul</td>
<td>2.24 km</td>
</tr>

<tr>
<td>Rio Branco</td>
<td>2.24 km</td>
</tr>

<tr>
<td>Pedra molhada</td>
<td>2.12 km</td>
</tr>

<tr>
<td>Lagoa doce</td>
<td>2.55 km</td>
</tr>
</table>

<p>O ponto d'água mais próximo seria a <b>Queda d'água</b> com <b>1.12km</b> de distância</p>
</details>



<!-- |Lugar        | Distância |
| ----------- | --------- |
|Queda d'água | 1.12 km   |
|Riacho       | 2.92 km   |
|Pedra do sapo| 1.80 km   |
|Córrego azul | 2.24 km   |
|Rio Branco   | 2.24 km   |
|Pedra molhada| 2.12 km   |
|Lagoa doce   | 2.55 km   | -->

É notável que essa tarefa não é muito eficiente. E, se saíssemos da mesma posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa que indique, para qualquer posição, qual a fonte d'água mais próxima?

## Diagrama de Voronoi