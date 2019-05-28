package interfacePart2;
import java.lang.Thread;
import java.lang.InterruptedException;

public class Downloader {
	private OnDownloadListener mListener;
	
	public Downloader(OnDownloadListener listener) {
		mListener = listener;
	}
	public void start() {
		System.out.println("Download Start");
		try {
			Thread.sleep(5000);
		}
		catch(InterruptedException e){
			System.out.println(e.getMessage());
		}
		// callBack
		mListener.onDownFinish();
		
	}
}
