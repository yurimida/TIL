# 0은 통로, 1은 벽, 2는 출발, 3은 도착
# 반환값이 없는 DFS() 함수

import sys
sys.stdin = open("4875.txt", "r")


sx = sy = ex = ey = 0
diff = [(0, 1), (0, -1), (1, 0), (-1, 0)]


def DFS(x, y):
    visit[x][y] = True

    for (dx, dy) in diff:
        tx, ty = x + dx, y + dy
        if tx < 0 or tx == N or ty < 0 or ty == N:
            continue
        if visit[tx][ty] or maze[tx][ty] == '1':
            continue

        DFS(tx, ty)

T = int(input())
for test_case in range(1, T + 1):
    N = int(input())

    maze = []
    visit = [[False for i in range(N)] for j in range(N)]

    for i in range(N):
        maze.append(input())
        for j in range(N):
            if maze[i][j] == '2':
                sx, sy = i, j
            if maze[i][j] == '3':
                ex, ey = i, j

    DFS(sx, sy)
    print("#%d %d" % (test_case, visit[ex][ey]))

