<style>

    body{
        max-width:70em;
        margin-inline: auto;
    }
    details{
        width:fill;
        background-color: #bbb;
        color: black;
        padding: 1rem;
        margin-block: 1rem;
    }

    details[open] summary{
        margin-bottom: 1rem;
    }

    table{
        width:100%;
        background-color:#ccc;
        filter: drop-shadow(3px 3px 0 #999);
    }
    table>*>*:nth-child(even), th {
        background-color: #ddd;
    }

    question{
        position:relative;
        display:block;
        background-color: #ffdadaff;
        min-height:3rem;
        color:#F50000;
        width:fill;
        padding:1rem;
        align-items:center;
        padding-left:5rem;
    }

    question>*{
        margin:0px;
    }

    question>*:first-child{
        font-weight: 500;
        font-size: 20px;
    }

    question::before{
        display: block;
        position: absolute;
        left:1rem;
        top:1rem;
        
        content:" ";
        background-image:url('imagens/question_icon.svg');
        background-size: contain;
        background-repeat: no-repeat;
        
        width:3rem;
        height:3rem;
    }
</style>


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

Image source: [virilo, Stack Overflow.](https://stackoverflow.com/questions/53696900/render-voronoi-diagram-to-numpy-array)

---

## Motivação

Imagine que você é um pássaro!
Você está voando o dia todo e não conseguiu beber nenhum gole de água. Por sorte, você sabe que ao seu redor, num raio de poucos quilômetros, existem algumas fontes de água. Aqui está o mapa da floresta:

![Mapa da floresta](imagens/mapa1.jpg)

Cada caixinha azul é um ponto de água diferente.

<question>

Como sabemos qual ponto de água mais próximo de você?

</question>

## Solução simples
Você sabe sua posição e a posição das fontes de água ao seu redor pois você é um pássaro e seu senso de localização é ótimo! (quase um GPS biológico).

![Mapa da florestacom coordenadas](imagens/mapa2.jpg)

É possível calcular todas as distâncias entre os você e cada um dos pontos utilizando o teorema de pitágoras.

**Tente encontrar o menor valor entre eles:**
<details>
<summary>
Resposta
</summary>

O arquivo `dist_m1.py` calcula todas essas distâncias e imprime seus valores.

|Lugar        | Distância |
| ----------- | --------- |
|Queda d'água | 1.12 km   |
|Riacho       | 2.92 km   |
|Pedra do sapo| 1.80 km   |
|Córrego azul | 2.24 km   |
|Rio Branco   | 2.24 km   |
|Pedra molhada| 2.12 km   |
|Lagoa doce   | 2.55 km   |

O ponto d'água mais próximo seria a **Queda d'água** com **1.12km** de distância
</details>


É notável que essa tarefa não é muito eficiente. E, se saíssemos da mesma posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa que indique, para qualquer posição, qual a fonte d'água mais próxima?

## Diagrama de Voronoi
Vamos começar por um exemplo simples. Temos apenas duas fontes d'água no nosso mapa:
![Duas fontes de água no mapa](imagens/mapa4.jpg)

Como podemos dividir esse espaço de modo a indicar, para qualquer ponto no mapa, qual a fonte mais próxima?

<question>

Pegue um papel e uma caneta e tente desenhar esse diagrama!

</question>

<details>
<summary>
Resposta
</summary>
Vamos traçar uma aresta que passa entre ambas as fontes e pintar de azul todos os pontos em que estão à esquerda dela e de verde aqueles que estão a sua direita:

![Duas fontes de água no mapa](imagens/mapa5.jpg)

Agora, sabemos que, se você estiver em qualquer ponto azul, o ponto mais próximo é a `Fonte A`. Se você estiver em qualquer ponto verde, porém, o ponto mais próximo é a `Fonte B`.
</details>

Agora vamos tentar com três pontos:

![Três fontes de água no mapa](imagens/mapa6.jpg)


<question>

Pegue um papel e uma caneta e tente desenhar esse diagrama!

</question>

<details>
<summary>
Resposta
</summary>
Se traçarmos uma reta que divide cada um dos pontos d'água entre si, podemos criar três arestas que subdividem o espaço em três células distintas.

<!-- Se ligarmos uma reta ligando dois pontos quaisquer e traçarmos outra reta perpendicular a ela que cruza o seu centro, conseguimos subdividir o espaço com três arestas. -->

![Duas fontes de água no mapa](imagens/mapa7.jpg)

**Observe atentamente esse diagrama e preste atenção nos detalhes:**

- O cruzamento de todos os segmentos de reta é no **baricentro** do triangulo formado pelas ligações entre os pontos.

- O ângulo entre cada uma das arestas e as retas que ligam 2 pontos é de 90º.

- Uma aresta sempre **divide ao meio** uma reta que liga dois pontos.

Assim, é muito mais fácil ver qual o ponto d'água mais próximo para qualquer ponto do mapa!

</details>

