package interfacePart1;

public class HelloWorld {
	public static void main(String []args) {
		//System.out.println("hello");
		Animal dog = new Dog("baduk");
		Animal cat = new Cat("nyaong");
		Animal wolf = new Wolf("waooo");
		
//		dog.Cry();
//		cat.Cry();
//		wolf.Cry();
		
		Pet pet1 = new Cat("nyaong");
		Pet pet2 = new Dog("baduk");
		
		pet1.FoodCall();
		pet2.FoodCall();
		
		((Cat)pet1).Cry();
		
	}
}
