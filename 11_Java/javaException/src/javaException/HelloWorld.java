package javaException;

public class HelloWorld {

	public static void main(String[] args) {

		try {
			boolean isSuccess = login("g82","111111112");
			if(isSuccess)System.out.println("login success");
			else System.out.println("login failed");
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		finally {
			System.out.println("copyright g82 2019");
		}
		
	}
	static boolean login(String id, String pw) throws Exception{
		// Client -> "g82" , "1111111" -> Server
		boolean isNoId = false;
		boolean isPasswordWrong = false;
		boolean isNetworkFailed = false;
		boolean isPWExpired = false;
		
		if(isNetworkFailed) throw new Exception("Network Failed");
		else if (isNoId) throw new Exception("user ID no exist");
		else if (isPasswordWrong) throw new Exception("Password Wrong");
		else if (isPWExpired) throw new Exception("Need change password");

		return true;
	}

}
