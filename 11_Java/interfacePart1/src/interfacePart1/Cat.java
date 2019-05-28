package interfacePart1;

public class Cat extends Animal implements Pet{
	public Cat(String name) { super(name);}
	@Override
	public void Cry() {
		System.out.println(name + "~~!!");
	}
	
	@Override
	public void FoodCall() {
		System.out.println("....");
	}
}
