import java.util.Scanner;
// n개의 음이 아닌 한 자리 정수를 입력받아 배열에 저장한다. 이들 중에서 1개 이상의 연속된 정수들을 합하여 얻을 수 있는 소수들 중에서 최대값을 구하여
// 출력하는 프로그램을 작성하여라. 
public class Code13 {

	public static void main(String[] args) {
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int [] data = new int [n];
		
		for (int i=0; i<n; i++) {
			data[i] = kb.nextInt();
		}
		
		kb.close();
		
		
		int maxPrime = 0;
		for (int i=0;i<n;i++) {
			for (int j=i;j<n;j++) {
				int val = 0; // integer overflow가 생기면 val로 안들어감. long을 써도 100자리 넘어가면 해결 안된다.
				for (int k=i;k<=j;k++) {
					val = val * 10 + data[k];
				
				}
				
				boolean isPrime = true;
				for(int p=2; p*p < val && isPrime;p++) {
					if(val % p ==0)
						isPrime = false;
				}
				if(isPrime && val > 1 && val > maxPrime)
					maxPrime = val;
			}
		}
		if(maxPrime>0)
			System.out.println("The max prime number is " + maxPrime);
		else
			System.out.println("No prime number exists");
	}

}
