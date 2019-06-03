import java.util.Scanner;

public class Code11 {
	public static void main(String[] args) {
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int [] data = new int [n];
		for (int i=0; i<n; i++)
			data[i] = kb.nextInt();
		kb.close();
		int count = 0;
		for (int i=0; i<n-1; i++) {
			for (int j=i+1; j<n; j++) {
				if(data[i] == data[j]) {
					count ++;
				}
			}
		}
		System.out.println(count + " ½Ö");
	}
}
