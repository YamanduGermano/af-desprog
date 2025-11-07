Algoritmo de Fortune para Diagrama de Voronoi
===

Como se encontrar pela floresta
---


## Motivação

<!-- Imagine que você é um pássaro!
Você está voando o dia todo e não conseguiu beber nenhum gole de água. Por sorte, você sabe que ao seu redor, num raio de poucos quilômetros, existem algumas fontes de água. Aqui está o mapa da floresta: -->

Imagine uma atividade rotineira como fazer uma **ligação de vídeo** para uma pessoa muito especial (para merecer uma ligação de vídeo, precisa ser especial mesmo). Nesse contexto, uma prioridade é enviar e receber informações com a **menor latência** possível.

Ao seu redor, existem várias antenas de comunicação para as quais podemos mandar um sinal. Esse sinal vai ser retransmitido por vários pontos ao longo da infraestrutura global de comunicação até chegar no seu destino. A fim de _minimizar a latência_ e aumentar a chance do sinal ser recebido sem perdas, seu celular enviar o sinal para a **antena mais próxima**.

Seu celular sabe sua posição no mapa e a posição das antenas ao seu redor:

![Mapa da cidade](mapa1.jpg)

!!!

Como é descobrimos qual a antena mais próxima de você?

!!!


Método das distâncias:
---

![Mapa da cidade com coordenadas](mapa2.jpg)

É possível calcular todas as distâncias entre os você e cada um dos pontos utilizando o teorema de pitágoras.

O arquivo `md dist_m1.py` calcula todas essas distâncias e imprime seus valores:

|Lugar        | Distância |
| ----------- | --------- |
|Queda d'água | 1.12 km   |
|Riacho       | 2.92 km   |
|Pedra do sapo| 1.80 km   |
|Córrego azul | 2.24 km   |
|Rio Branco   | 2.24 km   |
|Pedra molhada| 2.12 km   |
|Lagoa doce   | 2.55 km   |

A antena mais próxima seria a **Queda d'água** com **1.12km** de distância


É notável que essa tarefa não é muito eficiente. E, se saíssemos da mesma posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa que indique, para qualquer posição, qual a fonte d'água mais próxima?

Subdivisão por células
---

Vamos começar por um exemplo simples. Temos apenas duas fontes d'água no nosso mapa:

![Duas antenas no mapa](mapa3.jpg)

Como podemos dividir esse espaço de modo a indicar, para qualquer ponto no mapa, qual a fonte mais próxima?

???

Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Vamos traçar uma aresta que passa entre ambas as fontes e pintar de azul todos os pontos em que estão à esquerda dela e de verde aqueles que estão a sua direita:

![Subdivisão do mapa em duas células](mapa4.jpg)

Agora, sabemos que, se você estiver em qualquer ponto azul, o ponto mais próximo é a `md Fonte A`. Se você estiver em qualquer ponto verde, porém, o ponto mais próximo é a `md Fonte B`.
:::

???

Esse princípio

Agora vamos tentar com três pontos:

![Três antenas no mapa](mapa5.jpg)

???
Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Se traçarmos uma reta que divide cada um dos pontos d'água entre si, podemos criar três arestas que subdividem o espaço em três células distintas.

![Três células no mapa](mapa6.jpg)

<!-- Se ligarmos uma reta ligando dois pontos quaisquer e traçarmos outra reta perpendicular a ela que cruza o seu centro, conseguimos subdividir o espaço com três arestas. -->

**Observe atentamente esse diagrama e preste atenção nos detalhes:**

- O cruzamento de todos os segmentos de reta é no **baricentro** do triangulo formado pelas ligações entre os pontos.

- O ângulo entre cada uma das arestas e as retas que ligam 2 pontos é de 90º.

- Uma aresta sempre **divide ao meio** uma reta que liga dois pontos.

Assim, é muito mais fácil ver qual o ponto d'água mais próximo para qualquer ponto do mapa!

:::
???


Diagrama de Voronoi:
---

Dividindo pontos com arestas dessa maneira, podemos criar um mapa que nos conta exatamente qual o ponto mais próximo! Esse é o princípio do **Diagrama de Voronoi**.

![Diagrama de Voronoi](Coloured_Voronoi_2D.png)

Source: [Wikipédia](https://pt.wikipedia.org/wiki/Diagrama_de_Voronoy)


## O algoritmo de Fortune

Uma das formas mais eficientes de gerar diagramas de Voronoi é com o algoritmo de Fortune. Para entender seu funcionamento, vamos partir de uma ideia diferente — mas calma, no fim tudo fará sentido.

Vamos começar com o exemplo abaixo:

???
Pegue um papel e caneta e desenhe um ponto pequeno (chamaremos de ponto1), com uma linha horizontal poucos centimetros abaixo e desenhe 5 pontos sobre essa linha (Facilita se você colocar o ponto do meio exatamente embaixo do ponto1). Agora tente encontrar os pontos de equidistancia entre o ponto original e os pontos sobre a linha. 

Vai ficar algo parecido com isso:

![Ponto e Pontos na linha](mapa7.jpg)

Agora, tente encontrar os pontos equidistantes entre os pontos da linha e o ponto 1

:::

Seu diagrama deve ficar algo parecido com:

![Pontos de equidistancia](mapa8.jpg)

???

???

Você consegue perceber alguma relação entre esses pontos? Que formato esse padrão formaria?

:::
Você deve ter concluido que os pontos de equidistancia formam uma parabola

![Parabola](mapa9.jpg)

???



Agora partimos para um segundo instante. Vamos imaginar que a sweeping line desceu um pouco, para um pouco mais longe do nosso ponto 1. 

???
Tente pensar no que vai acontecer com os pontos e então com a parabola. 

Será que ela vai abrir/fechar mais? Será que vai permanecer igual?

Se não estiver conseguindo visualizar, use o papel e compare as respostas. Para que a diferença fique mais clara, faca uma sweeping line bem mais longe do ponto. 

:::

A parabola vai abrir cada vez mais quando a sweeping line desce. 

![Parabola aberta](mapa10.jpg)

???

Caso tenha restado alguma duvida, desenvolvemos um [arquivo no Geogebra](https://www.geogebra.org/calculator/xztbxdvv?) que facilita muito o entendimento:

<div style="position:relative; width:fit">

<!-- <iframe src="https://www.geogebra.org/calculator/xztbxdvv?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe> -->

</div>

Agora que nós deduzimos o comportamento do gráfico para um ponto so, está na hora de acrescentar um segundo ponto.


---

Agora com dois pontos, desenharemos sua parábola para cada um deles seguindo o mesmo procedimento da etapa anterior. Nosso foco cairá sobre a interseção entre essas parabolas:

![Duas parábolas](mapa11.jpg)

???
Antes de continuar, tente refletir sobre o que esse ponto de interseção significa. Utilizando o conhecimento de como os pontos da parábola são formados.

:::

Se a parábola é formada pelos pontos que são equidistantes entre o ponto de interesse e a sweeping line, o ponto de interseção entre duas parábolas equidistante para ambas.
![Pontos equidistantes](mapa12.jpg)

:::
???


???

Sabendo disso, imagine a sweeping line descendo em relação a sua posição anterior. Imagine o que pode estar acontecendo com os pontos de interseção. 


Desenvolvemos um [arquivo do Geogebra](https://www.geogebra.org/calculator/vkarzdzv) que vai ajudar bastante a tirar essa conclusão. Tente encontrar o tipo de relação entre os pontos de interseção com variação da sweeping line.


!!! Dica:
Para obter a resposta, ativar o trace do ponto de interseção.

Você deve ter concluido que os pontos tem uma relação linear uns com os outros. Essa linha que está sendo formada é justamente uma das arestas do diagrama de Voronoi.

Então, conforme a sweeping line desce, o algoritmo está traçando a aresta que divide os dois pontos no diagrama
!!!

???


???
Então, sabendo isso e do que falamos anteriormente sobre o diagrama de Voronoi, o que conseguimos concluir sobre pontos quaisquer que estão em um dos lados da linha? O que todos tem em comum com os seus respectivos pontos de interesse?

!!! Dica:
Pense na distancia
!!!

:::

Conseguimos concluir que um ponto qualquer de um dos lados da linha está mais próximo do ponto de interesse que está do mesmo lado do que do outro ponto de interesse.

???

Parabens, você acabou de entender a lógica por trás de um algoritmo de Fortune para 2 pontos em um grafico!

---

Antes de adicionarmos um ponto, vamos entender o conceito da beachline.

Como no início do handout, pense nos pontos equidistantes entre um ponto e a sweeping line — eles formam uma parábola. Pensou? Agora imagine duas dessas parábolas. A beachline é formada pelos pontos que estão ao mesmo tempo nas duas parábolas e que estão mais próximos da sweeping line em cada posição no eixo x.

Aqui esta uma imagem que nos ajuda a visualizar isso. 

![Beachline com 4 pontos](mapa13.jpg)

Agora que entendemos o conceito, vamos adicionar um terceiro ponto. A lógica é a mesma para 4, 5 ou mais pontos, então, ao compreendermos o caso com 3, poderemos generalizar para qualquer quantidade.

![Beachline com 4 pontos](mapa14.jpg)

Criamos um [arquivo do Geogebra](https://www.geogebra.org/calculator/nghuzruv) que facilita essa visualização e entendimento.


---

GUIZAO VAI ESCREVER AS ATIVIDADES PROS 3 PONTOS

<div style="position:relative; width:fit">

<!-- <iframe src="https://www.geogebra.org/calculator/z9zcsu6s?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe> -->

</div>

---

### Complexidade

O algoritmo de Fortune tem complexidade O(n log n). Isso quer dizer que, conforme o número de pontos aumenta, o tempo de execução cresce um pouco mais rápido que de forma linear.
A razão disso é que o algoritmo precisa processar os pontos em uma ordem específica, simulando a passagem da sweeping line. Cada vez que um novo evento acontece (por exemplo, quando a linha encontra um ponto ou quando duas parábolas se cruzam), o algoritmo atualiza o diagrama. O número total de atualizações é proporcional a n, já que há um evento principal para cada ponto. Essas atualizações não são instantâneas — elas exigem um pequeno custo adicional, que é o “log n” na conta.
Em resumo: ele é rápido porque analisa cada ponto apenas quando necessário e faz atualizações de forma organizada, sem precisar recalcular todo o diagrama a cada passo.

Outros algoritmos para gerar diagramas de Voronoi são menos eficientes que o de Fortune.
Um exemplo é o método direto por distância, que compara cada ponto do plano com todos os sítios e tem complexidade O(n²). Outro é o método incremental, que adiciona os pontos um a um e atualiza o diagrama a cada inserção, também com custo próximo de O(n²).
Por isso, o algoritmo de Fortune se destaca como o mais rápido entre eles, com complexidade O(n log n).