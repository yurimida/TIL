import java.util.Scanner;
public class Code03 {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "Hello"; // 공백도 하나의 문자열 
		String input = null;
		Scanner keyboard = new Scanner(System.in); // 입력 받는법 keyboard는 변수 이름 Sysyem.in 으로 키보드 입력을 받음.
		System.out.print("Please type a String:");
		input = keyboard.next(); // Hello world를 입력하면 가운데 공백때문에 Hello만 입력이 받아짐.
		if(str.equals(input)) { // str과 input 둘다 string인데 string은 == 연산자를 쓸수 없다. 오로지 프리미티브 타입만 가능.
			// string의 동일여부는 input.equals(str)으로 써도 가능함.
			System.out.println("Strings match :-)"); // print 와 println 의 차이는 println은 줄을 바꾼다.
		} else {
			System.out.println("Strings do not match!!! ");
		}
		keyboard.close(); // 더이상 scanner가 쓰이지 않으면 닫아준다.
	}
}
