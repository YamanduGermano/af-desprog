O algoritmo de Fortune
===

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

Se nao estiver conseguindo vizualizar, use o papel e compare as respostas. Para que a diferença fique mais clara, faca uma sweeping line bem mais longe do ponto. 

:::

A parabola vai abrir cada vez mais quando a sweeping line desce. 

![Parabola aberta](mapa11tr.jpg)

???

Agora nos deduzimos tudo o que deveriamos para um ponto so, e esta na hora de acrescentar um segundo ponto, ai mais pra frente um terceiro. 

---
Vamos começar evoluindo a atividade que fizemos para um ponto, agora usando 2. Cada um vai formar a sua parabola, que vai seguir o mesmo padrão da atividade que fizemos com um ponto so. Mas agora...

???
Vamos pensar agora sobre a interseção dessas parabolas. 
Desenvolvemos um arquivo no GeoGebra que vai ajudar bastante a tirar essa conclusão. Tente encontrar o tipo de relação entre os pontos de interseção com a sweeping line variando. 

Vai ser uma relação linear? Quadratica? Logaritmica?

INCLUIR ARQUIVO GEOGEBRA QUE MOSTRA INTERSEÇÃO ENTRE 2 PONTOS

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

Antes de adicionar-mos um ponto

Agora que entendemos o conceito, vamos adicionar um terceiro ponto. A lógica é a mesma para 4, 5 ou mais pontos, então, ao compreendermos o caso com 3, poderemos generalizar para qualquer quantidade.


Voltando a pensar nas parabolas criadas e nossa sweeping line, quais sao os pontos de equidistancia entre qualquer um dos pontos e a sweeping line? Perceba que esses pontos vao formar uma linha, e chamaremos essa linha de beachline
Dica: Pense nas parabolas e seus pontos de intersecoes.

O que podemos dizer sobre os pontos que estao nas parabolas mas nao na beachline? 


### TRES PONTOS

