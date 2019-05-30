
public class Code01 {
	
	static int num; // static 함수 내부에 선언되는 것은 static이 아니고 함수 외부의 모든 변수는 static으로 선언한다.
	public static void main(String[] args) {
		int anotherNum = 5;
		num = 2;
		
		System.out.println(num + anotherNum);
		System.out.println("Num: "+ num);
		System.out.println("AnotherNum: "+anotherNum);
		System.out.println("Sum: " + num + anotherNum); // left associativity 1) 먼저 sum2로 합쳐지고 sum25로 합쳐짐.
		System.out.println("Sum: " + (num + anotherNum)); 
	}

}
