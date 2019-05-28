package gameProject;

public class printTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PlayerCharacter player = new PlayerCharacter("gamepari", 100, 12);
        EnemyCharacter enemy = new EnemyCharacter("Orc", 80, 5);
        
        while(player.isLive() && enemy.isLive()) {
            player.attack(enemy);
            if (!enemy.isLive()) break;
            enemy.attack(player);
        }
        
        if (player.isLive()) {
            System.out.println(" player win!");
        }
        else {
            System.out.println(" enemy win!");
        }
	}

}
