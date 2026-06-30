/**
 * Button — pill button.
 * variants: "primary" (blue) | "accent" (green) | "secondary" (outline) | "ghost"
 */
export default function Button({
  variant = "primary",
  size,
  block = false,
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "lt-btn",
    `lt-btn--${variant}`,
    size === "sm" && "lt-btn--sm",
    block && "lt-btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render an anchor styled as a button when `href` is provided.
  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
