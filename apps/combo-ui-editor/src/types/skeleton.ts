export interface SkeletonVariant {
  name: string
  color: string
  shimmerColor: string
  borderRadius: BorderRadiusValue
  animation: SkeletonAnimation
  speed: number
  dark: DarkSkeleton
}

export interface DarkSkeleton {
  color: string
  shimmerColor: string
}
