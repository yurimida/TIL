# 190527 JAVA 

## Java 자료형

| int     | 314,433,-43462        | 제일 만만함               |
| ------- | --------------------- | ------------------------- |
| long    | -92383894789237489374 | 21억 넘어가면 이걸로 쓴다 |
| float   | 1.6f                  | 소숫점이 들어가면 쓴다    |
| string  | '겜팔이'              | 메모리가 터질때 까지      |
| boolean | True/false            | 오로지 참과 거짓뿐이다    |
| char    | 'A','B'               | string은 사실 char 집합   |

```java
int myNumber = 10000;
// myNumber에 10000을 넣는다! 


```

String은 무조건 ""

char는 ''

```java
public class HelloWorld{

     public static void main(String []args){
         
        int number = 100;
        int number2 = 43532;
        String myString = "hihihi";
       
        int plus = number + number2;
        int minus = number2 - number;
        int multipy = number * number2;
        int divide = number2 / number;
        int modulo = number2 % number;
        System.out.print(modulo);
      
     }
}

```

```java
public class HelloWorld{

     public static void main(String []args){
         
    
        String myString = "my brother";
        String addString = "Ho!";
        System.out.print(myString + addString);
      
     }
}
```

## java method

```java
public class HelloWorld {
	public static void main(String []args){
		int plusResult = plus(1,2);
		System.out.println(plusResult);
	}
	static int plus(int x, int y){
		return x+y;
	}
}
```

```java
public class HelloWorld {
	public static void main(String []args){
		printTwice("oo-AH");
    }
	// void는 return이 없는 함수
	static void printTwice(String text) {
		System.out.println(text);
	}
	static int plus(int x, int y){
		return x+y;
	}
}
```

```java
boolean isZZaksu (int x)
{ 
	int y = x % 2;
	if(y == 0){
		return true;
	}
	else return false;
}
```

## Java if 문 

```java
public class HelloWorld{

     public static void main(String []args){
       
        boolean isCar = false;
        boolean isHaveHouse = false;
        boolean isGoldSpoon = false;
        boolean isJob = false;
        int asset = 17000;
        int grade = myGrade(isCar, isHaveHouse, isJob, isGoldSpoon,asset);
        System.out.println("your grade" + grade);
     }
     static int myGrade(boolean isCar,boolean isHaveHouse,boolean isJob, boolean isGoldSpoon, int asset){
     	if (isGoldSpoon){
        	return 1;
      }
      else if (isHaveHouse){
        return 2;
      }
      else if (isCar){
        return 3;
      }
      else if (isJob){
        return 4;
      }
      else{
   			 if (asset >= 30000000){
           return 5;
         }
        else if (1000000 <= asset && asset < 30000000){
          return 6;
        }
         else if (100000 <= asset && asset < 1000000){
          return 7;
        }
         else if (17000 <= asset && asset < 100000){
          return 8;
        }
         else {
          return 9;
        }

         }
       }
     }
//   && and    || or
```

## java 배열

```
String[] names = new String[11];
names[0] = "Kwon";
names[1] = "Kim";
```

## Java 반복문

```java
String[] names = new String[11];
names[0] = "Kwon";
names[1] = "Kim";

for (int i = 0; i < names.length; i++)
{
	System.out.println(names[i]);
}

int i = 0;
-----------------------------------------------------------------
while ( i < names.length)
{
  System.out.println(names[i]);
  i = i + 1;
}
```

## 인생무상 프로그램 만들기

```java
import java.util.Random;

public class HelloWorld{
	public static void main(String []args){
    Random random = new Random();
    int money = 10000;
    while ( money >= 1000){
      //buy lotto
      //money = money - 500;
      money -= 1000;
      int number = random.nextInt(100);
      int lottoMoney = buyLotto(number);
	 		System.out.println("My number is"+number+"Lotto:" + buyLotto(number));
      money += lottoMoney;
      System.out.println("My Money is" + money);
    }
	System.out.println("Lose....");	 
	}
	static int buyLotto(int number){
			int[] lotto = new int[100];
    	for (int i = 0; i < lotto.length; i++){
        lotto[i] = 0;
      }
			lotto[2] = 100;
			lotto[77] = 3000;
			lotto[99] = 500;
      
      		return lotto[number];
	}
}
```

## Headfirst Java 추천@

