package Section2;

public class Code17 {

	public static void main(String[] args) {
		for (int n=-100; n<=100000; n++) {
			if(isPrime(n))
				System.out.println(n);
		}
	}
	static boolean isPrime(int k) {
		if (k<2) return false;
		for (int i=2; i*i <= k; i++)
			if (k % i ==0)
				return false;
		return true;
	}
}
