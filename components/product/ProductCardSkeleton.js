import { Card, CardContent, Skeleton, Divider, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        position: "relative",
        padding: 0,
        borderRadius: 3,
        width: 224,
        height: 362,
        backgroundColor: "var(--color-background1)",
        border: "2px solid var(--color-background1)",
        boxShadow: "none",
      }}
    >
      {/* Image Placeholder */}
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />

      <CardContent>
        {/* Title Placeholder */}
        <Box mb={1}>
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "1rem" }}
            width="90%"
          />
        </Box>

        {/* Price Placeholder */}
        <Box mt={3} sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "1.5rem" }}
            width="40%"
          />
          {/* Old Price shim (optional) */}
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "1rem", marginLeft: 1 }}
            width="30%"
          />
        </Box>

        {/* Divider & Rating Placeholder */}
        <Divider sx={{ my: 1 }} />

        <Box pb={3}>
          {/* stars */}
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={20}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
