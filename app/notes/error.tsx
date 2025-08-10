"use client";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <div>
      Error: <h1>{error.message}</h1>
    </div>
  );
}
