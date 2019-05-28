package interfacePart1;

public class Dog extends Animal implements Pet{
	public Dog(String name) { super(name);}
	@Override
	public void Cry() {
		System.out.println(name + "~~~~~~");
	}
	@Override
	public void FoodCall() {
		System.out.println(name + "~~~~~~");
	}
}
