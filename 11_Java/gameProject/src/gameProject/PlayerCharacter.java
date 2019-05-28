package gameProject;

public class PlayerCharacter extends Character {
    public PlayerCharacter(String name, int hp, int atk){
        super(name,hp,atk);
    }
    public void Heal() {
    	hp += 20;
    	System.out.println(name + "HEAL!!!!!!");
    	System.out.println(name + "HP:" + hp);
    }
}