import os
import unittest
from unittest.mock import patch

from fastapi import HTTPException

from routes.hughes_routes import require_hughes_token


class PrivateRouteAuthTests(unittest.TestCase):
    def test_rejects_requests_when_token_is_not_configured(self) -> None:
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(HTTPException) as context:
                require_hughes_token(None)

        self.assertEqual(context.exception.status_code, 401)

    def test_rejects_wrong_bearer_token(self) -> None:
        with patch.dict(os.environ, {"HUGHES_API_TOKEN": "correct"}, clear=True):
            with self.assertRaises(HTTPException) as context:
                require_hughes_token("Bearer wrong")

        self.assertEqual(context.exception.status_code, 401)

    def test_accepts_matching_bearer_token(self) -> None:
        with patch.dict(os.environ, {"HUGHES_API_TOKEN": "correct"}, clear=True):
            require_hughes_token("Bearer correct")


if __name__ == "__main__":
    unittest.main()
