import { create } from "zustand"

const useCategoryStore = create((set) => ({
  categories: [
    {
      id: 1,
      name: "Tractors",
      description: "Powerful tractors for all your farming needs.",
      image: "https://ghanamps.com/wp-content/uploads/2021/11/tractors.jpg", // adjust path accordingly
    },
    {
      id: 2,
      name: "Harvesters",
      description: "Efficient harvesters for high yield seasons.",
      image: "https://www.harvester.com.gh/wp-content/uploads/2023/10/A-Look-at-the-Benefits-of-Using-Kubota-Combine-Harvesters-in-Ghanaian-Agriculture-900x500.webp",
    },
    {
      id: 3,
      name: "Irrigation Systems",
      description: "Modern irrigation tools to maximize water use.",
      image: "https://thebftonline.com/wp-content/uploads/2024/11/IRRIGA.png",
    },
    {
      id: 4,
      name: "Ploughs",
      description: "Durable ploughs for soil preparation.",
      image: "https://www.future-agricultures.org/wp-content/uploads/2025/01/credit-USAID-Ghana-768x511.jpg",
    },
  ],
}))
export default useCategoryStore
