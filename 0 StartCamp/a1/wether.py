from darksky import forecast

multicampus = forecast('dc1ef520b6e2be5d5f4c2736256745ec', 37.501311, 127.037471)

print(multicampus['currently']['temperature'])