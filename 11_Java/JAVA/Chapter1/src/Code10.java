// 1 ~100000 사이의 모든 소수를 찾는 함수


public class Code10 {
	public static void main(String[] args) {
		for (int n=2; n<=100000; n++) {
			boolean isPrime = true;
			for (int i=2; i*i<=n && isPrime; i++) { // for(int i=2; i<=n/2; i++) isPrime은 break 같은 역할을 해줌.
				if (n%i==0)
					isPrime = false;
			}
			if (isPrime)
				System.out.println(n);
		}

	}

}
