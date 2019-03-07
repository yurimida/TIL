import sys
sys.stdin = open('input10.txt','r')

# total = int(input())
#
# for index in range(1,total+1):
#     count = 0
#     str = list(input())
#     def remove(str):
#         global count
#         flag = False
#         for i in range(0,len(str)-1):
#             if str[i] == str[i+1]:
#                 del str[i]
#                 del str[i]
#                 flag = True
#                 break
#             elif str[i] != str[i+1]:
#                 count += 1
#         if flag:
#             remove(str)
#
#         if count == len(str)-1 or len(str) <= 1:
#             return
#
#
#     remove(str)
#     print('#{} {}'.format(index,len(str)))

total = int(input())

for index in range(1, total + 1):
    def remove(char):
        add = []
        global new
        for i in range(len(char) - 1):
            if char[i] == char[i + 1]:
                add += char[i]
                add += char[i + 1]
                new = [j for j in char]
                new.pop(i)
                new.pop(i)

                return remove(new)


    # charlist = list(input())
    # if remove(charlist) is None:
    #     print(f'#{index} {len(new)}')
