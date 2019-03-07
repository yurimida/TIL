import sys
sys.stdin = open('input15.txt','r')

# total = int(input())
# for index in range(1,total+1):
#
#     N, K = map(int,input().split())
#     puz = []
#     ans = 0
#     for q in range(N):
#         count = 0
#         puz = list(map(int,input().split()))
#         for i in puz:
#             if i == 1:
#                 count += 1
#                 if count == K:
#                     ans += 1
#                     count -= 1
#                 if count > K:
#                     ans -= 1
#                     count -= 1
#             if i == 0:
#                 count = 0
#     print(ans)
T = int(input())
for tc in range(1, T + 1):
    N, K = map(int, input().split())
    data = [list(map(int, input().split())) for _ in range(N)]
    ans = 0
    for i in range(N):
        cnt_col = 0
        cnt_row = 0
        for j in range(N):
            if data[i][j] == 1:
                cnt_row += 1
            else:
                if cnt_row == K:
                    ans += 1
                cnt_row = 0
            if data[j][i] == 1:
                cnt_col += 1
            else:
                if cnt_col == K:
                    ans += 1
                cnt_col = 0
        else:
            if cnt_row == K:
                ans += 1
            if cnt_col == K:
                ans += 1
    print('#{} {}'.format(tc, ans))




