import java.util.Scanner;

public class Code08 {

	public static void main(String[] args) {
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int [] data = new int [n];
		
		for(int i = 0; i<n; i++)
			data[i] = kb.nextInt();
		
		kb.close();
		
		int sum = 0;
		int max = -0xffffff;
		for(int i=0; i<n; i++) {
			sum += data[i];
			if(data[i] > max) 
				max = data[i];
		}
		System.out.println("The sum is " + sum + " and the maximum is "+ max);

	}

}
