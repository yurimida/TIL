import java.util.Scanner;
public class Code03 {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "Hello"; // ���鵵 �ϳ��� ���ڿ� 
		String input = null;
		Scanner keyboard = new Scanner(System.in); // �Է� �޴¹� keyboard�� ���� �̸� Sysyem.in ���� Ű���� �Է��� ����.
		System.out.print("Please type a String:");
		input = keyboard.next(); // Hello world�� �Է��ϸ� ��� ���鶧���� Hello�� �Է��� �޾���.
		if(str.equals(input)) { // str�� input �Ѵ� string�ε� string�� == �����ڸ� ���� ����. ������ ������Ƽ�� Ÿ�Ը� ����.
			// string�� ���Ͽ��δ� input.equals(str)���� �ᵵ ������.
			System.out.println("Strings match :-)"); // print �� println �� ���̴� println�� ���� �ٲ۴�.
		} else {
			System.out.println("Strings do not match!!! ");
		}
		keyboard.close(); // ���̻� scanner�� ������ ������ �ݾ��ش�.
	}
}
