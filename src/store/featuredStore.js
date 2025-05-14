import { create } from "zustand"

const useFeaturedStore = create((set) => ({
  featuredProducts: [
    {
      id: 1,
      name: "John Deere Tractor",
      price: "$251.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxOaJW15SSvYQCF4NAp_ZzZQcwBtP9150NQZEgxMsi0esuCS0XgK7UVGNm6jHZKA5SPc&usqp=CAU",
    },
    {
      id: 2,
      name: "Mini Harvester",
      price: "$152.45",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUFasQ1HSqH1HJVYs6Ews7ykMjfXAYFyHqQ&s",
    },
    {
      id: 3,
      name: "Irrigation Kit",
      price: "$75.50",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPL0CcD72KQDQmAFeODHpVcV1CCjVSjyf67Q&s",
    },
    {
      id: 4,
      name: "Seed Planter",
      price: "$45.20",
      image: "https://maizemachine.com/wp-content/uploads/2022/08/maize-planting-machine.webp",
    },
    {
      id: 5,
      name: "Knapsack Sprayer",
      price: "$60.89",
      image: "https://image.made-in-china.com/365f3j00GKUaSbLdnJqf/16liter-Agro-Manual-Backpack-Weed-Sprayer-Ghana-Nigeria-Kenya-Sprayer.webp",
    },
    {
      id: 6,
      name: "Harvester Farm Machine",
      price: "$75.89",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwGd2nzDXHNUENLLC7QREY5O4EZDyOKiXcGhcW4MpU-hpM2F-ehsIONN6x-ecT5mVlz3A&usqp=CAU",
    },
  ],
}))
export default useFeaturedStore
