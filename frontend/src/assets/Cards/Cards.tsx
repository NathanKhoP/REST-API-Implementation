function Cards(food: any) {
    return (
      <div className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-card">
        <div className="p-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={food.image || "https://placehold.co/600x400"}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
            {food.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{food.description}</p>
  
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">{food.average.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({food.count})</span>
            </div>
            <p className="text-base font-bold text-primary">${food.price.toFixed(2)}</p>
          </div>
        </div>
        </div>
      </div>
    )
  }
  
  export default Cards
  
  