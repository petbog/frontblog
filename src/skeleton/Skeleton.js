import ContentLoader from "react-content-loader"

const Skeleton  = (props) => (
  <ContentLoader 
    speed={3}
    width={800}
    height={600}
    viewBox="0 0 800 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#a3a3a3"
    {

  ...props}
  >
    <rect x="21" y=

"7" rx="19" ry=





























"19" width="564" height="576" />
  </ContentLoader>
)
export default Skeleton