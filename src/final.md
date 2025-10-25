Algoritmo de Fortune para Diagrama de Voronoi
===

Como se encontrar pela floresta
---


## Motivação

Imagine que você é um pássaro!
Você está voando o dia todo e não conseguiu beber nenhum gole de água. Por sorte, você sabe que ao seu redor, num raio de poucos quilômetros, existem algumas fontes de água. Aqui está o mapa da floresta:

![Mapa da floresta](mapa1.jpg)

Cada caixinha azul é um ponto de água diferente.

!!!

Como sabemos qual ponto de água mais próximo de você?

!!!



## Métodos de localização:

Método das distâncias
---

Você sabe sua posição e a posição das fontes de água ao seu redor pois você é um pássaro e seu senso de localização é ótimo! (quase um GPS biológico).

![Mapa da florestacom coordenadas](mapa2.jpg)

É possível calcular todas as distâncias entre os você e cada um dos pontos utilizando o teorema de pitágoras.

???

Tente encontrar o menor valor entre eles:
:::

O arquivo `md dist_m1.py` calcula todas essas distâncias e imprime seus valores.

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
:::

???

É notável que essa tarefa não é muito eficiente. E, se saíssemos da mesma posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa que indique, para qualquer posição, qual a fonte d'água mais próxima?

Subdivisão por células
---

Vamos começar por um exemplo simples. Temos apenas duas fontes d'água no nosso mapa:
![Duas fontes de água no mapa](mapa4.jpg)

Como podemos dividir esse espaço de modo a indicar, para qualquer ponto no mapa, qual a fonte mais próxima?

???

Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Vamos traçar uma aresta que passa entre ambas as fontes e pintar de azul todos os pontos em que estão à esquerda dela e de verde aqueles que estão a sua direita:

![Duas fontes de água no mapa](mapa5.jpg)

Agora, sabemos que, se você estiver em qualquer ponto azul, o ponto mais próximo é a `Fonte A`. Se você estiver em qualquer ponto verde, porém, o ponto mais próximo é a `Fonte B`.
</details>

Agora vamos tentar com três pontos:

![Três fontes de água no mapa](mapa6.jpg)

:::

???

???

Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Se traçarmos uma reta que divide cada um dos pontos d'água entre si, podemos criar três arestas que subdividem o espaço em três células distintas.

<!-- Se ligarmos uma reta ligando dois pontos quaisquer e traçarmos outra reta perpendicular a ela que cruza o seu centro, conseguimos subdividir o espaço com três arestas. -->

![Duas fontes de água no mapa](mapa7.jpg)

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
Pegue um papel e caneta e desenhe um ponto pequeno (chamaremos de ponto1), com uma linha horizontal poucos centimetros abaixo e desenhe 5 pontos sobre essa linha (Facilita se voce colocar o ponto do meio exatamente embaixo do ponto1). Agora tente encontrar os pontos de equidistancia entre o ponto original e os pontos sobre a linha. 

Vai ficar algo parecido com isso:

![Ponto e Pontos na linha](mapa8tr.jpg)

Agora, tente encontrar os pontos equidistantes entre os pontos da linha e o ponto 1

:::

Seu diagrama deve ficar algo parecido com:

![Pontos de equidistancia](mapa9tr.jpg)

???

???

Você consegue perceber alguma relação entre esses pontos? Que formato esse padrão formaria?

:::
Voce deve ter concluido que os pontos de equidistancia formam uma parabola

![Parabola](mapa10tr.jpg)

???



Agora partimos para um segundo instante. Vamos imaginar que a sweeping line desceu um pouco, para um pouco mais longe do nosso ponto 1. 

???
Tente pensar no que vai acontecer com os pontos e então com a parabola. 

Sera que ela vai abrir/fechar mais? Sera que vai permanecer igual?

Se nao estiver conseguindo visualizar, use o papel e compare as respostas. Para que a diferença fique mais clara, faca uma sweeping line bem mais longe do ponto. 

:::

A parabola vai abrir cada vez mais quando a sweeping line desce. 

![Parabola aberta](mapa11tr.jpg)

???

Caso tenha restado alguma duvida, desenvolvemos um arquivo no geogebra que facilita muito o entendimento:

<div style="position:relative; width:fit">

<iframe src="https://www.geogebra.org/calculator/xztbxdvv?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe>

</div>

Agora nos deduzimos tudo o que deveriamos para um ponto so, e esta na hora de acrescentar um segundo ponto, ai mais pra frente um terceiro. 

---
Vamos começar evoluindo a atividade que fizemos para um ponto, agora usando 2. Cada um vai formar a sua parabola, que vai seguir o mesmo padrão da atividade que fizemos com um ponto so. Mas agora...

???
Vamos pensar agora sobre a interseção dessas parabolas. 
Desenvolvemos um arquivo no GeoGebra que vai ajudar bastante a tirar essa conclusão. Tente encontrar o tipo de relação entre os pontos de interseção com a sweeping line variando. 

Vai ser uma relação linear? Quadratica? Logaritmica?

<div style="position:relative; width:fit">

<iframe src="https://www.geogebra.org/calculator/vkarzdzv?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe>

</div>

:::

Para obter a resposta, ativar o trace do ponto de interseção.
???


???

Sabendo isso, O que conseguimos deduzir sobre pontos que para um lado da linha e para o outro? O que todos tem em comum com quais respectivos pontos de interesse?

Dica: Pense na distancia

:::

Conseguimos concluir que pontos de cada lado da linha estao mais proximos do ponto de interesse que esta do mesmo lado da linha

???

Parabens, voce acabou de entender a logica por traz de um algoritmo de Fortune para 2 pontos em um grafico!

---

Antes de adicionar-mos um ponto, vamos entender o conceito da beachline.

Como no início do handout, pense nos pontos equidistantes entre um ponto e a sweeping line — eles formam uma parábola. Pensou? Agora imagine duas dessas parábolas. A beachline é formada pelos pontos que estão ao mesmo tempo nas duas parábolas e que estão mais próximos da sweeping line em cada posição no eixo x.

Aqui esta uma imagem que nos ajuda a visualizar isso. 



Agora que entendemos o conceito, vamos adicionar um terceiro ponto. A lógica é a mesma para 4, 5 ou mais pontos, então, ao compreendermos o caso com 3, poderemos generalizar para qualquer quantidade.


Voltando a pensar nas parabolas criadas e nossa sweeping line, quais sao os pontos de equidistancia entre qualquer um dos pontos e a sweeping line? Perceba que esses pontos vao formar uma linha, e chamaremos essa linha de beachline
Dica: Pense nas parabolas e seus pontos de interseçoes.

Abaixo esta um arquivo no GeoGebra que facilita essa visualização e entendimento.

<div style="position:relative; width:fit">

<iframe src="https://www.geogebra.org/calculator/nghuzruv?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe>

</div>

---

Três Pontos e o Nascimento da Beachline
---

Agora que você já entendeu a lógica para um ponto e para dois pontos, chegou a hora de adicionar o terceiro.

Prepare o papel e a caneta: desenhe três pontos não alinhados — algo como um triângulo.
Assim como no caso de dois pontos, quando a sweeping line (linha de varredura) começa acima dos três pontos e desce lentamente, cada um dos pontos gera a sua própria parábola.

???

Desenhe as parábolas para cada ponto, com a sweeping line abaixo dos três.
O que podemos observar?

:::
<div style="position:relative; width:fit"> 
<iframe src="https://www.geogebra.org/calculator/nghuzruv?embed" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe> 
</div>

Movimente o slider "sweep" e observe o comportamento das parábolas. Você deve ter notado que as parábolas se encontram em dois pontos de interseção.
Esses pontos são especiais — e vão nos levar à essência do algoritmo de Fortune.
:::

???

O Segredo das Interseções
---

???

Se um ponto está na interseção de duas parábolas, o que isso significa sobre as distâncias?

:::
Esse ponto está equidistante de três elementos:
- do Ponto 1,
- do Ponto 2,
- da sweeping line.
:::

???

Agora imagine que continuamos descendo a sweeping line.
Em um instante preciso, as três parábolas se encontram em um mesmo ponto.
Quando isso acontece, esse ponto é equidistante:

- do Ponto 1
- do Ponto 2
- do Ponto 3
- da sweeping line

A “Parábola Engolida”
---

Enquanto a sweeping line desce, cada ponto mantém sua própria parábola viva na beachline —
a curva que representa todos os pontos que estão à mesma distância de algum dos focos e da sweeping line.

Mas, quando a linha chega à altura da tangente inferior da circunferência que passa pelos três pontos, algo curioso acontece:

A parábola do ponto mais distante (o que está no topo da circunferência) é engolida pelas outras duas.
Ou seja, ela deixa de fazer parte da beachline.

???

O que isso significa?

:::
Significa que, naquele instante, surge um novo vértice no diagrama de Voronoi —
o ponto onde as três células se encontram!
:::

???

O Evento de Círculo
---

Esse momento é chamado de evento de círculo (circle event) no algoritmo de Fortune.

Ele marca o instante em que uma das parábolas da beachline desaparece — ou “morre”.
E, exatamente nesse momento, o algoritmo cria um vértice de Voronoi no ponto de interseção das três arestas correspondentes.

???

Tente visualizar: se a sweeping line continuar descendo, o vértice recém-criado fica para trás, congelado no mapa,
enquanto a beachline continua se deformando abaixo.

:::
<div style="position:relative; width:fit"> 
<iframe src="https://www.geogebra.org/calculator/z9zcsu6s" allowfullscreen style="border: 1px solid #e4e4e4;border-radius: 4px; width:100%; height:70vh" frameborder="0"></iframe> 
</div>
:::

???

Resumindo o Processo
---

- Cada ponto gera uma parábola conforme a sweeping line desce.
- As interseções dessas parábolas formam as arestas do diagrama.
- Quando três parábolas se encontram e formam uma circunferência tangente à sweeping line:
- O ponto mais distante é “engolido” → evento de círculo;
- O cruzamento das três parábolas é salvo → novo vértice de Voronoi.
- A beachline continua viva, atualizando-se a cada novo ponto ou evento.

---

Complexidade
---

O algoritmo de Fortune tem complexidade O(n log n). Isso quer dizer que, conforme o número de pontos aumenta, o tempo de execução cresce um pouco mais rápido que de forma linear.
A razão disso é que o algoritmo precisa processar os pontos em uma ordem específica, simulando a passagem da sweeping line. Cada vez que um novo evento acontece (por exemplo, quando a linha encontra um ponto ou quando duas parábolas se cruzam), o algoritmo atualiza o diagrama. 

O número total de atualizações é proporcional a n, já que há um evento principal para cada ponto. Essas atualizações não são instantâneas — elas exigem um pequeno custo adicional, que é o “log n” na conta.
Em resumo: ele é rápido porque analisa cada ponto apenas quando necessário e faz atualizações de forma organizada, sem precisar recalcular todo o diagrama a cada passo.

Outros algoritmos para gerar diagramas de Voronoi são menos eficientes que o de Fortune.
Um exemplo é o método direto por distância, que compara cada ponto do plano com todos os sítios e tem complexidade O(n²). Outro é o método incremental, que adiciona os pontos um a um e atualiza o diagrama a cada inserção, também com custo próximo de O(n²).
Por isso, o algoritmo de Fortune se destaca como o mais rápido entre eles, com complexidade O(n log n).