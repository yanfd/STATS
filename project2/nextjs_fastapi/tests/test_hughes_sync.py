import unittest
from unittest.mock import patch

import requests

from hughes_utils import HughesSync


class HughesSyncFailureTests(unittest.TestCase):
    def test_repository_listing_failure_is_not_reported_as_empty_archive(self) -> None:
        sync = HughesSync("token")

        with patch(
            "hughes_utils.requests.get",
            side_effect=requests.ConnectionError("network unavailable"),
        ):
            with self.assertRaises(requests.ConnectionError):
                sync.fetch_markdown_files()

    def test_file_download_failure_is_not_silently_skipped(self) -> None:
        sync = HughesSync("token")

        with patch(
            "hughes_utils.requests.get",
            side_effect=requests.Timeout("request timed out"),
        ):
            with self.assertRaises(requests.Timeout):
                sync.fetch_file_content("https://api.github.test/file")


if __name__ == "__main__":
    unittest.main()
