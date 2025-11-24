Algoritmo de Fortune para Diagrama de Voronoi
===

---


## Motivação

_Como se encontrar pela cidade_

Imagine uma atividade rotineira como fazer uma **ligação de vídeo** para uma pessoa muito especial (para merecer uma ligação de vídeo, precisa ser especial mesmo). Nesse contexto, uma prioridade é enviar e receber informações com a **menor latência** possível.

Ao seu redor, existem várias antenas de comunicação para as quais podemos mandar um sinal. Esse sinal vai ser retransmitido por vários pontos ao longo da infraestrutura global de comunicação até chegar no seu destino. A fim de _minimizar a latência_ e aumentar a chance do sinal ser recebido sem perdas, seu celular deve enviar o sinal para a **antena mais próxima**.

Seu celular sabe sua posição no mapa e a posição das antenas ao seu redor:

![Mapa da cidade](mapa1.jpg)

!!!

Como descobrimos qual a antena mais próxima de você?

!!!


Método das distâncias:
---

![Mapa da cidade com coordenadas](mapa2.jpg)

É possível calcular todas as distâncias entre você e cada um dos pontos utilizando o teorema de pitágoras.

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


É notável que essa tarefa não é muito eficiente. E se mudássemos posição, precisaríamos calcular todas as distâncias novamente.

E se existisse um mapa pré-calculado que dividisse a cidade em regiões, onde cada região indica qual antena está mais próxima? Bastaria olhar em qual região você está!

Subdivisão por células
---

Vamos começar por um exemplo simples. Temos apenas duas antenas no nosso mapa:

![Duas antenas no mapa](mapa3.jpg)

Como podemos dividir esse espaço de modo a indicar, para qualquer ponto no mapa, qual é a antena mais próxima?

<span id="2pontos"></span>

???

Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Primeiro, vamos traçar uma **reta perpendicular** que passa pelo ponto médio entre as duas antenas (a mediatriz).

Depois, vamos pintar de azul todos os pontos em que estão à esquerda dessa aresta, e de verde aqueles que estão à sua direita:

![Subdivisão do mapa em duas células](mapa4.jpg)

Agora, sabemos que, se você estiver em qualquer ponto azul, o ponto mais próximo é a `md Antena A`. Se você estiver em qualquer ponto verde, porém, o ponto mais próximo é a `md Antena B`.
:::

???


Agora vamos tentar com três pontos:

![Três antenas no mapa](mapa5.jpg)

???
Pegue um papel e uma caneta e tente desenhar esse diagrama!

:::

Se traçarmos a mediatriz entre cada par de antenas (retas perpendiculares que passam pelos pontos médios), conseguimos criar três arestas que subdividem o espaço em três células distintas.

![Três células no mapa](mapa6.jpg)

<!-- Se ligarmos uma reta ligando dois pontos quaisquer e traçarmos outra reta perpendicular a ela que cruza o seu centro, conseguimos subdividir o espaço com três arestas. -->

**Observe atentamente esse diagrama e preste atenção nos detalhes:**

- As três arestas se encontram em um único ponto: o **baricentro** (centro geométrico) do triângulo formado pelas antenas.

- O ângulo entre cada uma das arestas e as retas que ligam 2 antenas é de 90º.

- Uma aresta sempre **divide ao meio** uma reta que liga duas antenas.

Assim, é muito mais fácil ver qual a antena mais próxima para qualquer ponto do mapa!

:::
???


Diagrama de Voronoi:
---

Essa divisão sistemática do espaço em células é o **Diagrama de Voronoi**.


Cada célula representa uma **região de influência**: todos os pontos dentro dela estão mais próximos de uma antena específica do que de qualquer outra.
Ao invés de calcular N distâncias a cada mudança de posição, você faz uma única consulta visual. O mapa faz o trabalho pesado por você.


E funciona para qualquer quantidade de pontos - 3 antenas, 100 antenas, 10.000 antenas. O princípio é o mesmo.

![Diagrama de Voronoi](Coloured_Voronoi_2D.png)

Source: [Wikipédia](https://pt.wikipedia.org/wiki/Diagrama_de_Voronoy)


## O algoritmo de Fortune

Uma das formas mais eficientes de gerar diagramas de Voronoi é com o algoritmo de Fortune. Para entender seu funcionamento, vamos partir de uma ideia diferente — mas calma, no fim tudo fará sentido.

Vamos começar com o exemplo abaixo:

???
Pegue um papel e caneta e desenhe um ponto pequeno (chamaremos de ponto 1), com uma linha horizontal (chamaremos de sweeping line) poucos centimetros abaixo e desenhe 5 pontos sobre essa linha horizontal (Facilita se você colocar o ponto do meio exatamente embaixo do ponto 1). Agora tente encontrar os pontos de equidistância entre o ponto original e os pontos sobre a linha. 

Vai ficar algo parecido com isso:

![Ponto e Pontos na linha](mapa7.jpg)

Agora, tente encontrar os pontos equidistantes entre os pontos da linha horizontal e o ponto 1

:::

Seu diagrama deve ficar algo parecido com:

![Pontos de equidistancia](mapa8.jpg)

???

???

Você consegue perceber alguma relação entre esses pontos? Que formato esse padrão formaria?

:::
Você deve ter concluido que os pontos de equidistância formam uma parábola

![Parabola](mapa9.jpg)

???

**Mas... o que essa parábola realmente significa?**

![Divisão do espaço em duas áreas pela parábola](mapa11.jpg)

Antes, com [2 pontos](./#2pontos) no gráfico, podiamos subdividir a imagem em duas regiões com uma linha reta.

Da mesma maneira, essa parábola está dividindo nosso espaço em duas regiões:
- **Dentro da parábola (em azul):** pontos mais próximos do `md Ponto 1`
- **Fora da parábola (em verde):** pontos mais próximos da `md sweeping line` (ou de qualquer coisa abaixo dela)

Aqui está o pulo do gato: a sweeping line está **varrendo** o plano de cima para baixo. Conforme ela desce, vamos "descobrindo" novos pontos. A parábola representa **o máximo de informação que temos até agora** sobre a região de influência do Ponto 1.

É uma **construção parcial** do diagrama. Ainda não sabemos como será o formato final, mas já sabemos que tudo dentro dessa parábola definitivamente pertence à região do Ponto 1 - pelo menos em relação a tudo que já varremos.

---

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


Complexidade do Algoritmo de Fortune
---

Agora que entendemos como o algoritmo funciona, vamos analisar sua eficiência: quanto tempo ele demora para construir um diagrama de Voronoi com n pontos?

A resposta é **O(n log n)**, e vamos provar isso passo a passo.

---

## 1. Contando os Eventos

O algoritmo funciona processando **eventos** conforme a sweeping line desce. Já conhecemos os dois tipos:

**Site Events (eventos de ponto):** ocorrem quando a sweeping line atinge um ponto de interesse. Cada site event cria uma nova parábola na beachline.

**Circle Events (eventos de círculo):** ocorrem quando três parábolas adjacentes convergem num ponto. A parábola do meio desaparece e criamos um vértice do diagrama de Voronoi.

???

Quantos site events existem em um diagrama com n pontos?

:::

A resposta é fácil: exatamente **n site events**, um para cada ponto de interesse.

???

???

E quanto aos circle events? Quantos podem existir?

:::

Essa pergunta é mais difícil. Para respondê-la, precisamos entender quantos **vértices** pode ter um diagrama de Voronoi.

Por quê? Porque cada circle event cria exatamente um vértice no diagrama. Então o número de circle events é igual ao número de vértices.

Para descobrir quantos vértices pode ter um diagrama de Voronoi, vamos usar uma ferramenta poderosa da matemática: a **Fórmula de Euler**.

???

---

## A Fórmula de Euler

O diagrama de Voronoi é um **grafo planar** — isso significa que suas arestas não se cruzam. Para todo grafo planar conectado, vale a seguinte relação:

**V - E + F = 2**

Onde:
- **V** é o número de vértices (pontos onde 3 células se encontram)
- **E** é o número de arestas (linhas que separam as células)
- **F** é o número de faces (as células do diagrama)

???

No nosso diagrama de Voronoi com n pontos, quantas faces temos?

:::

Temos exatamente **n faces** — uma célula para cada ponto de interesse.

Portanto: **F = n**

???

???

Qual é a relação entre vértices (V) e arestas (E)?

!!! Dica
No diagrama de Voronoi, cada vértice tem grau 3 — exatamente 3 arestas se encontram nele.
!!!

:::

Uma propriedade importante de grafos diz que a soma de todos os graus dos vértices é igual a 2E. Por quê? Porque cada aresta tem duas pontas, então ao somar os graus de todos os vértices, contamos cada aresta duas vezes.

Se cada vértice tem grau 3, então:
- Soma dos graus = 3V
- Mas soma dos graus = 2E

Portanto: **3V = 2E**, ou seja, **E = (3V)/2**

Agora podemos substituir tudo na Fórmula de Euler:

V - E + F = 2

V - (3V)/2 + n = 2

Multiplicando tudo por 2 para eliminar a fração:

2V - 3V + 2n = 4

-V + 2n = 4

-V = 4 - 2n

**V = 2n - 4**

Com ajustes técnicos para casos especiais (como pontos colineares), a matemática rigorosa mostra que:

**V ≤ 2n - 5**

:::

???

??? 

Então, quantos circle events pode ter um diagrama com n pontos?

:::

Como cada circle event cria um vértice, e temos no máximo 2n - 5 vértices, então temos **no máximo 2n - 5 circle events**.

**Total de eventos:**
- Site events: n
- Circle events: ≤ 2n - 5
- **Total: ≤ 3n - 5 = O(n) eventos**

???

---

## 2. Custo de Processar Cada Evento

Sabemos que temos O(n) eventos. Mas quanto tempo o algoritmo leva para processar cada um?

Quando um evento acontece, o algoritmo precisa fazer duas coisas principais:

1. **Atualizar a beachline** — inserir ou remover parábolas mantendo a ordem por posição `x`
2. **Atualizar a fila de eventos** — inserir ou remover eventos futuros mantendo a ordem por posição `y`

Ambas as estruturas são implementadas usando **árvores balanceadas** (como árvores AVL ou rubro-negras).

???

Por que árvores balanceadas custam O(log n)?

:::

Uma árvore balanceada com n elementos tem altura log₂ n. Por exemplo:
- 8 elementos → altura 3 (log₂ 8 = 3)
- 1024 elementos → altura 10 (log₂ 1024 = 10)

Para inserir, remover ou buscar um elemento, você precisa descer pela árvore nível por nível. Como a altura é log n, cada operação custa **O(log n)**.

Portanto, o custo para processar cada evento é **O(log n)**.

???

---

## 3. Multiplicando Tudo

Agora temos todas as peças do quebra-cabeça:

- Número de eventos: **O(n)**
- Custo por evento: **O(log n)**

A complexidade total é:

**O(n) × O(log n) = O(n log n)**

---

## 4. Comparando com Outros Métodos

Existem outros algoritmos para construir diagramas de Voronoi, mas o Algoritmo de Fortune é o mais eficiente.

O **método incremental**, por exemplo, adiciona pontos um por um e recalcula o diagrama a cada inserção. Cada inserção pode afetar O(n) células existentes, resultando em complexidade **O(n²)**.

Para n = 1000 pontos:
- Método incremental: aproximadamente 1.000.000 de operações
- Algoritmo de Fortune: aproximadamente 10.000 operações

**O Algoritmo de Fortune é cerca de 100 vezes mais rápido.**

???

Prossiga apenas quando tiver certeza de que entendeu:
1. O número total de eventos é O(n), limitado pela Fórmula de Euler
2. Cada evento custa O(log n) devido às árvores balanceadas
3. A complexidade total é O(n) × O(log n) = O(n log n)

???