Três Pontos e o Nascimento da Beachline
===

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

Cada ponto gera uma parábola conforme a sweeping line desce.

As interseções dessas parábolas formam as arestas do diagrama.

Quando três parábolas se encontram e formam uma circunferência tangente à sweeping line:

o ponto mais distante é “engolido” → evento de círculo;

o cruzamento das três parábolas é salvo → novo vértice de Voronoi.

A beachline continua viva, atualizando-se a cada novo ponto ou evento.