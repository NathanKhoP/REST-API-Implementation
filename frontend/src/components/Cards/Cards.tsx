import { Link } from "react-router-dom";

interface CardProps {
  _id: string;
  image: string;
  name: string;
  description: string;
  average: number;
  count: number;
  price: number;
  onDelete?: (id: string) => void;
}

function Cards({ _id, image, name, description, average, count, price, onDelete }: CardProps) {
  return (
    <div className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-card relative">
      <div className="p-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={image || "https://placehold.co/600x400"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px]">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <div className="h-[40px] mb-2">
            <p className="text-sm text-muted-foreground line-clamp-2 break-words overflow-hidden">
              {description}
            </p>
          </div>
  
          {/* Price moved to middle of card */}
          <p className="text-xl font-bold text-primary mb-4 text-center">${price.toFixed(2)}</p>
          
          <div className="flex items-start align-left mt-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">{average.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </div>
          </div>
          
          {/* Add edit and delete buttons */}
          {_id && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Link 
                to={`/edit-food/${_id}`} 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                title="Edit"
              >
                ✏️
              </Link>
              {onDelete && (
                <button 
                  onClick={() => onDelete(_id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  title="Delete"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cards;

