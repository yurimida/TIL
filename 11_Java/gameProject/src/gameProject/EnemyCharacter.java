package gameProject;

public class EnemyCharacter extends Character {
    public EnemyCharacter(String name, int hp, int atk) {
        super(name, hp, atk);
    }
    
    @Override
    public void attack(Character enemy){
        
        if (hp <= 20) {
            System.out.println("Orc is Angry .... >0< !!!!");
            this.atk += 15;
        }    
        super.attack(enemy);
        PlayerCharacter player = (PlayerCharacter)enemy;
        if (player.hp <= 30) {
        	player.Heal();
        }
    }
}
