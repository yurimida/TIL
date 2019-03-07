total = int(input())
for index in range(1, total + 1):
    N, K = map(int, input().split())
    puz = [list(map(int, input().split())) for _ in range(N)]
    ans = 0
    for i in range(N):
        count = 0
        count2 = 0
        for j in range(N):
            if puz[i][j] == 1:
                count2 += 1
            else:
                if count2 == K:
                    ans += 1
                count2 = 0
            if puz[j][i] == 1:
                count += 1
            else:
                if count == K:
                    ans += 1
                count = 0
        else:
            if count2 == K:
                ans += 1
            if count == K:
                ans += 1
    print('#{} {}'.format(index, ans))
