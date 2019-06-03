import java.util.Scanner;

public class Code02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int number = 123;
		Scanner keyboard = new Scanner(System.in); // 입력 받는법 keyboard는 변수 이름 Sysyem.in 으로 키보드 입력을 받음.
		System.out.print("Please enter an integer:");
		int input = keyboard.nextInt();
		
		if(input == number) {
			System.out.println("Numbers match :-)"); // print 와 println 의 차이는 println은 줄을 바꾼다.
		} else {
			System.out.println("Numbers do not match!!! ");
		}
		keyboard.close(); // 더이상 scanner가 쓰이지 않으면 닫아준다.
	}

}
