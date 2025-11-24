Algoritmo de Fortune para Diagrama de Voronoi
===

---


## Motivação

_Como se encontrar pela cidade_

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

| Lugar    | Distância |
| -------- | --------- |
| Antena 2 | 1.12 km   |
| Antena 1 | 2.92 km   |
| Antena 3 | 1.80 km   |
| Antena 4 | 2.24 km   |
| Antena 7 | 2.24 km   |
| Antena 6 | 2.12 km   |
| Antena 5 | 2.55 km   |

A antena mais próxima seria a **Antena 2** com **1.12km** de distância


É notável que essa tarefa não é muito eficiente. E, se saíssemos da mesma posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa que indique, para qualquer posição, qual a antena mais próxima?

Subdivisão por células
---

Vamos começar por um exemplo simples. Temos apenas duas antenas no nosso mapa:

![Duas antenas no mapa](mapa3.jpg)

Como podemos dividir esse espaço de modo a indicar, para qualquer ponto no mapa, qual a antena mais próxima?

<span id="2pontos"></span>

???

Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Vamos traçar uma aresta que passa entre ambas as fontes e pintar de azul todos os pontos em que estão à esquerda dela e de verde aqueles que estão a sua direita:

![Subdivisão do mapa em duas células](mapa4.jpg)

Agora, sabemos que, se você estiver em qualquer ponto azul, o ponto mais próximo é a `md Antena A`. Se você estiver em qualquer ponto verde, porém, o ponto mais próximo é a `md Antena B`.
:::

???


Agora vamos tentar com três pontos:

![Três antenas no mapa](mapa5.jpg)

???
Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Se traçarmos uma reta que divide cada um das antenas entre si, podemos criar três arestas que subdividem o espaço em três células distintas.

![Três células no mapa](mapa6.jpg)

<!-- Se ligarmos uma reta ligando dois pontos quaisquer e traçarmos outra reta perpendicular a ela que cruza o seu centro, conseguimos subdividir o espaço com três arestas. -->

**Observe atentamente esse diagrama e preste atenção nos detalhes:**

- O cruzamento de todos os segmentos de reta é no **baricentro** do triangulo formado pelas ligações entre os pontos.

- O ângulo entre cada uma das arestas e as retas que ligam 2 pontos é de 90º.

- Uma aresta sempre **divide ao meio** uma reta que liga dois pontos.

Assim, é muito mais fácil ver qual a antena mais próxima para qualquer ponto do mapa!

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


Agora vamos dar uma pausa antes de prosseguir. É importante que fique bem claro o significado dessa parábola no nosso problema.

Antes, com [2 pontos](./#2pontos) no gráfico, podiamos subdividir a imagem em duas regiões com uma linha reta. O ponto que estivesse dentro da região _azul_ estaria dentro da **região de controle** da `md Antena A`, ou seja, está mais próximo da dela do que a `md Antena B`,

![Divisão do espaço em duas áreas pela parábola](mapa11.jpg)

Aqui, nós também estamos subdividindo nosso espaço entre os pontos mais próximos do `md Ponto 1` (em azul) e os mais próximos da `md Sweeping Line` ou de qualquer ponto abaixo dela (em verde).

Os pontos que estão equidistantes do ponto e da Sweeping Line (nossa parábola) delimitam essas duas áreas. Prossiga apenas quando tiver certeza que entendeu o motivo e significado da parábola.

---

Agora que nós deduzimos o comportamento do gráfico para um ponto só, está na hora de acrescentar um segundo ponto. Para cada um deles desenharemos sua parábola seguindo o mesmo procedimento da etapa anterior. Nosso foco cairá sobre a **interseção** entre essas parabolas:

![Duas parábolas](mapa12.jpg)

???
Esses cruzamentos não são apenas coincidências gráficas; eles têm um significado geométrico profundo.

Antes de continuar, tente refletir sobre o que esse ponto de interseção significa utilizando o conhecimento de como os pontos da parábola são formados.

:::


Para entender o que realmente está acontecendo nesses pontos, precisamos olhar para o que eles representam em termos de distância.

![Pontos equidistantes](mapa13.jpg)

Esse ponto está equidistante de três elementos:
- do Ponto 1,
- do Ponto 2,
- da sweeping line.

Se utilizarmos essas parábolas para dividir a área em subregiões de controle, temos a seguinte imagem:

![Pontos equidistantes](mapa14.jpg)

Para os pontos acima das parábolas, aqueles à esquerda do ponto de intersecção na área _azul_ estão mais próximos do `md Ponto 1` enquanto aqueles à direita na área _verde_ estão mais próximos do `md Ponto 2`.


:::
???

!!!

Ainda não podemos afirmar com certeza a quem pertence a região formada pelos segumentos das interseções entre as duas parábolas. Por que isso?

!!!

???

Imagine a sweeping line descendo em relação a sua posição anterior. Imagine o que pode estar acontecendo com os pontos de interseção. 


Desenvolvemos um [arquivo do Geogebra](https://www.geogebra.org/calculator/vkarzdzv) que vai ajudar bastante a tirar essa conclusão. Tente encontrar o tipo de relação entre os pontos de interseção com variação da sweeping line.


!!! Dica:
Para obter a resposta, ativar o trace do ponto de interseção.

!!!

:::

Você deve ter concluido que os pontos tem uma relação linear uns com os outros. Essa linha que está sendo formada é justamente uma das arestas do diagrama de Voronoi.

Então, conforme a sweeping line desce, o algoritmo está traçando a aresta que divide os dois pontos no diagrama

![Aresta sendo criada entre pelos pontos de interseção](mapa15.jpg)


:::

???


???
Então, sabendo isso e do que falamos anteriormente sobre o diagrama de Voronoi, o que conseguimos concluir sobre pontos quaisquer que estão em um dos lados da linha? O que todos tem em comum com os seus respectivos pontos de interesse?

!!! Dica:
Pense na distancia
!!!

:::

Conseguimos concluir que um ponto qualquer de um dos lados da linha está mais próximo do ponto de interesse que está do mesmo lado do que do outro ponto de interesse.

![Pontos equidistantes](mapa16.jpg)

???

Parabens, você acabou de entender a lógica por trás de um algoritmo de Fortune para 2 pontos em um grafico!

---

Antes de adicionarmos um ponto, vamos entender o conceito da **Beachline**.

Quando analisamos os pontos relevantes para a divisão da área em _regiões de controle_ os segmentos acima do ponto de interseção podem ser ignorados pois não nos dizem muita coisa.

Apenas observando os outros segmentos nós podemos observar esse padrão, que podemos chamar de **Beachline** (ele se assemelha à linha formada pelo encontro do mar com a areia, dai vem o nome):

![Beachline com 2 pontos](mapa17.jpg)

Se adicionarmos um terceiro ponto, a ideia se mantem a mesma: pegamos apenas os segmentos que ligam os pontos de interseção e os segmentos das extremidades.

![Beachline com 3 pontos](mapa18.jpg)

Assim, conseguimos a área entre os pontos mais próximos dos pontos de controle e aqueles mais próximos da sweeping line.

![Beachline com 3 pontos](mapa19.jpg)


A “Parábola Engolida”
---

Criamos um [arquivo do Geogebra](https://www.geogebra.org/calculator/nghuzruv) que facilita visuaizarmos a evolução da beachline conforme a sweeping line avança.

Interaja com ele: mova a beachline e os pontos e veja o que acontece.

???

Inicialmente temos três pontos. O do meio está mais para cima do gráfico do que os outros dois.

Conforme descemos, o que acontece com os pontos de interseção das parábolas?

:::

Em um instante específico, as três parábolas se encontram em um mesmo ponto.

![Interseção de 3 pontos](mapa20.jpg)

:::

???

Ok, já vimos interseções entre parábolas antes, sabemos o que isso significa.

O problema aparece quando descemos com a sweepline:

![Interseção de 3 pontos novamente](mapa21.jpg)

Temos novamente 3 pontos de interseção. O problema, porém, é que o ponto do meio está muito mais abaixo do que os outros dois.

???

Se tentarmos construir uma beachline a partir dessas parábolas, seguindo as regras que vimos, como ela seria formada?

:::

Nesse momento, algo marcante acontece: a parábola do ponto mais alto desaparece da beachline — ela é “engolida” pelas outras duas, pois os segmentos em verde e amarelo que formam as interseções estão acima do ponto de interseção.

![Beachline com 3 pontos](mapa22.jpg)


:::
???


!!! 

Nessa configuração, então, não faz mais sentido calcular a parábola de cima pois ela não faz mais diferença para a beachline.

**Mas, quando encontramos o momento certo para parar de calcular?**

!!!

Na verdade, já temos essa informação! Na interseção entre os três pontos.

???

Ok, é fácil ver quando isso acontece arrastando um slider no Geogebra.

Como descobrimos onde colocar a nossa sweeping line sem precisarmos ficar arrastando até achar o valor correto?

!!! Dica

Esse ponto está à mesma distância dos três focos e da sweeping line.
Se registrássemos todos os pontos que mantêm essa distância constante, formaríamos um contorno fechado.



!!!
:::
Pense: qual é a forma geométrica que reúne todos os pontos que estão à mesma distância de um mesmo centro?

Exatamente — um **círculo**!

![Circunferencia](mapa23.jpg)
:::
???


---

O Evento de Círculo
---

Esse instante especial recebe o nome de evento de círculo (circle event) no algoritmo de Fortune.

Ele marca o momento exato em que uma das parábolas da beachline desaparece — ou, como se diz, morre.
No mesmo instante, o algoritmo registra o ponto onde isso acontece: o vértice de Voronoi, o local onde as três células se encontram.

???

Tente visualizar:
à medida que a sweeping line continua descendo, esse vértice recém-criado fica para trás, como uma marca gravada no mapa.


Enquanto isso, a beachline segue viva — mudando de forma e criando novos vértices conforme mais eventos acontecem.

:::

Acesse o [arquivo do Geogebra](https://www.geogebra.org/calculator/z9zcsu6s) para visualizar o Evento de Círculo.

:::

???

---

Resumindo o Processo
---

- Cada ponto gera uma parábola conforme a sweeping line desce.
- As interseções dessas parábolas formam as arestas do diagrama.
- Quando três parábolas se encontram e formam uma circunferência tangente à sweeping line:
- O ponto mais distante é “engolido” → evento de círculo;
- O cruzamento das três parábolas é salvo → novo vértice de Voronoi.
- A beachline continua viva, atualizando-se a cada novo ponto ou evento.


---
Discretização

!!! Cuidado!
Apesar de ser intuitivo imaginar que a sweeping line desce pouco a pouco e isso é calculado, na realidade isso não ocorre.
!!!

Na implementação prática, não simulamos a linha movendo-se continuamente. Em vez disso, discretizamos o movimento em eventos — instantes relevantes em que algo muda na beachline. Se fossemos calcular a beachline para cada ponto, teríamos infinitos pontos, o que seria impossível de calcular.

Desse jeito, precisamos fetuar cálculos apenas para cada ponto no mapa e para cada _circle event_.

---

Complexidade
---

Partindo para o tema de complexidade, vamos começar pensando sobre o numero de pontos de interesse e como ele vai impactar a complexidade

???

Imagine que estamos criando um diagrama de voronoi com 5 pontos de interesse. Conforme a sweeping line desce, ela vai encontrando eventos.
Quantos eventos principais você acha que teremos nesse caso?

:::

Teremos 1 para cada ponto, entao 5 eventos principais. 

???

???

E se tivessemos 10 pontos de interesse? E 20?

:::

Você deve ter percebido que a quantidade de eventos principais é proporcional ao número de pontos de interesse.
Cada ponto gera um novo evento — o algoritmo precisa lidar com todos eles, um por um.
Isso já nos dá uma boa pista sobre a complexidade do algoritmo.

???

Mas sera que o algoritmo precisa se preocupar com todos os pontos a todo momento? A resposta e não! Essa e a grande diferenca do algoritmo de Fortune para os outros, ele so tem que se preocupar com os pontos vizinhos, então os pontos relativamente proximos da sweeping line

???

Pensando então que o algoritmo so precisa se preocupar com os pontos vizinhos, o que podemos concluir sobre a complexidade do algoritmo?

Dica 1: Pode ajudar pensar em um algoritmo com 3 pontos e comparar com um algoritmo com 1000. Sera que ele faz o mesmo numero de contas novas para cada ponto de interesse novo que aparece? Ou sera que não esta tudo mais pronto e determinado ja?

Dica 2: Como concluimos anteriormente, a complexidade e parcialmente linear, então sabemos que é O (n * algo)

:::

A complexidade e O(n logn).

Podemos concluir isso pensando que, além de lidar com cada ponto uma vez (por isso o n), o algoritmo também precisa manter os eventos em ordem conforme a sweeping line desce.

Mas o que significa “manter em ordem”?

Significa que, a cada novo ponto ou evento de círculo, o algoritmo atualiza sua lista de eventos — inserindo ou removendo itens de forma organizada.
Essas pequenas atualizações explicam o log n na complexidade.
???


Outros algoritmos para gerar diagramas de Voronoi são menos eficientes que o de Fortune.
Um exemplo é o método direto por distância, que compara cada ponto do plano com todos os sítios e tem complexidade O(n²). Outro é o método incremental, que adiciona os pontos um a um e atualiza o diagrama a cada inserção, também com custo próximo de O(n²).
Por isso, o algoritmo de Fortune se destaca como o mais rápido entre eles, com complexidade O(n log n).