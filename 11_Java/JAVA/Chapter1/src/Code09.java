import java.util.Scanner;

public class Code09 {

	public static void main(String[] args) {
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int [] data = new int [n];
		for (int i = 0; i<n; i++)
			data[i] = kb.nextInt();
		int temp  = data[n-1];
		
		for(int i = n-2; i >= 0; i--) 
			data[i+1] = data[i];
		
		data[0] = temp;
		kb.close();
		
		for (int j=0; j<n; j++) {
			System.out.println(data[j]);
		}
		
	}

}
