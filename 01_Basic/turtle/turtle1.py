import turtle as t  #turtle가 너무 기니까 나는 t라고 부를꺼야!


# for i in range(4):
#     t.forward(100)
#     t.right(90)

# t.right(60)
# t.forward(100)
# t.right(90)
# t.forward(100)
# t.right(60)
# t.forward(100)


class MagicBrush:
    t.color('red')
    def draw_sqaure(self):  
        for i in range(4):
            t.forward(100)
            t.right(90)


    def draw_triangle(self):
        for i in range(3):
            t.forward(100)
            t.right(120)

    def go(self):
        t.forward(200)

    def turn(self):
        t.right(90)


# m1 = MagicBrush()
# m2 = MagicBrush()


brad = t.Turtle()
brad.shape('turtle')
brad.speed(2)
brad.forward(1000)

# m1.go()
# m2.turn()
# m1.turn()
# m1.go()
# m2.go()




# m2.draw_sqaure()
# m2.draw_triangle()
# m1.draw_sqaure()
# t.left(180)
# m1.draw_triangle()


# draw_sqaure()
# t.left(180)
# draw_triangle()
