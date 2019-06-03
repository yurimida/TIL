package Section2;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Code19 {

	public static void main(String[] args) {
		try {
			String filename = "input.txt";
			Scanner inFile;
			inFile = new Scanner(new File(filename));
			String [] name = new String [1000];
			String [] number = new String [1000];
			int count = 0; 
			while (inFile.hasNext()) { // detect End of File
				name[count] = inFile.next();
				number[count] = inFile.next();
				count++;
			}
			inFile.close();
			for(int i=0; i<count; i++)
				System.out.println("Name:"+ name[i] + ".Phone:"+number[i]);
		} catch (FileNotFoundException e) {
			System.out.println("No file!");
			e.printStackTrace();
		}
	}
}
