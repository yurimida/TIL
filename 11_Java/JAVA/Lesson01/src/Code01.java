
public class Code01 {
	
	static int num; // static �Լ� ���ο� ����Ǵ� ���� static�� �ƴϰ� �Լ� �ܺ��� ��� ������ static���� �����Ѵ�.
	public static void main(String[] args) {
		int anotherNum = 5;
		num = 2;
		
		System.out.println(num + anotherNum);
		System.out.println("Num: "+ num);
		System.out.println("AnotherNum: "+anotherNum);
		System.out.println("Sum: " + num + anotherNum); // left associativity 1) ���� sum2�� �������� sum25�� ������.
		System.out.println("Sum: " + (num + anotherNum)); 
	}

}
