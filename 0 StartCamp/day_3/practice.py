  
pick = [1,2,3,4,5,6]

draw = [1,2,3,4,5,7]

bonus = [6]
  
  
match = pick & draw
  
if(len(match) == 5 and bonus == pick):
 print("2등입니다.")