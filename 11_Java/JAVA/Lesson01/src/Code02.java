import java.util.Scanner;

public class Code02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int number = 123;
		Scanner keyboard = new Scanner(System.in); // �Է� �޴¹� keyboard�� ���� �̸� Sysyem.in ���� Ű���� �Է��� ����.
		System.out.print("Please enter an integer:");
		int input = keyboard.nextInt();
		
		if(input == number) {
			System.out.println("Numbers match :-)"); // print �� println �� ���̴� println�� ���� �ٲ۴�.
		} else {
			System.out.println("Numbers do not match!!! ");
		}
		keyboard.close(); // ���̻� scanner�� ������ ������ �ݾ��ش�.
	}

}
