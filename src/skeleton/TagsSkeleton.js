import ContentLoader from "react-content-loader"

const TagsSkeleton  = (props) => (
    <ContentLoader 
      speed={3}
      width={400}
      height={84}
      viewBox="0 0 400 84"
      backgroundColor="#f3f3f3"
      foregroundColor="#c4c4c4"
      {...props}
    >
      <rect x="15" y="23" rx="9" ry="9" width="95" height="32" /> 
      <rect x="125" y="23" rx="9" ry="9" width="99" height="32" /> 
      <rect x="238" y="23" rx="9" ry="9" width="98" height="32" />
    </ContentLoader>
  )
  

export default TagsSkeleton