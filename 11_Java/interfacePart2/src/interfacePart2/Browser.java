package interfacePart2;

public class Browser implements OnDownloadListener{
	public void imgClick() {
		//mListener ÀÌ this
		Downloader loader = new Downloader(this);
		loader.start();
	}
	
	@Override
	public void onDownFinish() {
		System.out.println("Browser : onDownFinish() ");
	}
	
	@Override
	public void onDownFailed() {
		
	}
}
